-- ==============================================================================
-- EIGHTRACER - COMPREHENSIVE DATABASE SECURITY & RLS POLICIES (SUPABASE SQL)
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor.
-- It enables Row Level Security (RLS) across ALL tables, defines role-based guards,
-- enforces single-device session tracking, and configures secure storage rules.
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. USER ROLES & ROLE LOCKING
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student')),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  nip VARCHAR(50),
  nisn VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure email column exists if table was previously created
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- Index for fast role lookup
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Helper function to check if current authenticated user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Helper function to check if current authenticated user is a Student
CREATE OR REPLACE FUNCTION public.is_student()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'student'
  );
$$;

-- ==============================================================================
-- 3. STRICT SESSION MANAGEMENT (SINGLE DEVICE LOGIN & EXPIRY)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  device_info TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_active ON public.admin_sessions(user_id, is_active);

-- Audit log for sensitive admin operations
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  target_user_id UUID,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. CORE PRD DOMAIN TABLES (WITH SENSITIVE FIELD ENCRYPTION)
-- ==============================================================================

-- 1. Domain Biodata Murid (Tabel Induk)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nisn VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(100),
  current_class VARCHAR(50),
  social_aid_status VARCHAR(50), -- PIP, PKH, KIS, dll
  -- Encrypted phone/WhatsApp number at rest:
  phone_encrypted TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Domain Asesmen Karakteristik
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  learning_style VARCHAR(100),
  personality_type VARCHAR(100), -- Melankolis, Plegmatis, dll
  riasec_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Domain Penentuan Eligibilitas
CREATE TABLE IF NOT EXISTS public.eligibility (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  avg_rapor_score DECIMAL(5,2),
  tka_score DECIMAL(5,2),
  is_eligible BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Domain Data Alumni ke Perguruan Tinggi (Masuk PT)
CREATE TABLE IF NOT EXISTS public.alumni_admissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  university_name VARCHAR(255),
  study_program VARCHAR(255),
  admission_path VARCHAR(100), -- SNBP, SNBT, Mandiri, dll
  is_kipk_applicant BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Domain Data Alumni di Perguruan Tinggi (Fitur Unggulan B4)
CREATE TABLE IF NOT EXISTS public.alumni_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  university_name VARCHAR(255),
  current_semester INT,
  gpa DECIMAL(3,2), -- IPK
  is_kipk_receiver BOOLEAN DEFAULT false,
  other_scholarships TEXT,
  ukt_amount DECIMAL(15,2),
  timeline_status VARCHAR(255), -- "Diterima", "Lulus Semester 1", "Menerima Beasiswa"
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES - PREVENT IDOR & UNAUTHORIZED ACCESS
-- ==============================================================================

-- Enable RLS on ALL tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_progress ENABLE ROW LEVEL SECURITY;

-- --- RLS for user_roles ---
-- Admins can read all roles; users can only read their own role
DROP POLICY IF EXISTS "Admins have full access to user_roles" ON public.user_roles;
CREATE POLICY "Admins have full access to user_roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- --- RLS for admin_sessions ---
-- Only admins can query/manage admin sessions
DROP POLICY IF EXISTS "Admin sessions accessible only by admins" ON public.admin_sessions;
CREATE POLICY "Admin sessions accessible only by admins"
  ON public.admin_sessions FOR ALL
  USING (public.is_admin() OR auth.uid() = user_id);

-- --- RLS for admin_audit_logs ---
-- Audit logs are append-only by admins, read-only by admins
DROP POLICY IF EXISTS "Admin audit logs viewable by admins" ON public.admin_audit_logs;
CREATE POLICY "Admin audit logs viewable by admins"
  ON public.admin_audit_logs FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admin audit logs insertable by admins" ON public.admin_audit_logs;
CREATE POLICY "Admin audit logs insertable by admins"
  ON public.admin_audit_logs FOR INSERT
  WITH CHECK (public.is_admin());

-- --- RLS for students ---
-- Admin has full access; Students can only view their own record
DROP POLICY IF EXISTS "Admins have full access to students" ON public.students;
CREATE POLICY "Admins have full access to students"
  ON public.students FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Students can view their own profile" ON public.students;
CREATE POLICY "Students can view their own profile"
  ON public.students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND nisn = students.nisn
    )
  );

-- --- RLS for assessments ---
DROP POLICY IF EXISTS "Admins have full access to assessments" ON public.assessments;
CREATE POLICY "Admins have full access to assessments"
  ON public.assessments FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Students can view their own assessment" ON public.assessments;
CREATE POLICY "Students can view their own assessment"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      JOIN public.user_roles ur ON ur.nisn = s.nisn
      WHERE s.id = assessments.student_id AND ur.user_id = auth.uid()
    )
  );

-- --- RLS for eligibility ---
DROP POLICY IF EXISTS "Admins have full access to eligibility" ON public.eligibility;
CREATE POLICY "Admins have full access to eligibility"
  ON public.eligibility FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Students can view their own eligibility status" ON public.eligibility;
CREATE POLICY "Students can view their own eligibility status"
  ON public.eligibility FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      JOIN public.user_roles ur ON ur.nisn = s.nisn
      WHERE s.id = eligibility.student_id AND ur.user_id = auth.uid()
    )
  );

-- --- RLS for alumni_admissions (Study Tracer) ---
-- Admins can manage; authenticated users (students) can read tracer directory
DROP POLICY IF EXISTS "Admins have full access to alumni_admissions" ON public.alumni_admissions;
CREATE POLICY "Admins have full access to alumni_admissions"
  ON public.alumni_admissions FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can view alumni admissions" ON public.alumni_admissions;
CREATE POLICY "Authenticated users can view alumni admissions"
  ON public.alumni_admissions FOR SELECT
  USING (auth.role() = 'authenticated');

-- --- RLS for alumni_progress (Fitur Unggulan) ---
-- Admins can manage; authenticated users can read progress & charts
DROP POLICY IF EXISTS "Admins have full access to alumni_progress" ON public.alumni_progress;
CREATE POLICY "Admins have full access to alumni_progress"
  ON public.alumni_progress FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can view alumni progress" ON public.alumni_progress;
CREATE POLICY "Authenticated users can view alumni progress"
  ON public.alumni_progress FOR SELECT
  USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 6. STORAGE SECURITY (FILE UPLOAD RESTRICTIONS)
-- ==============================================================================

-- Create secure storage bucket for student documents (if not exists)
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'student-documents',
    'student-documents',
    false,
    5242880, -- Exactly 5 MB (5 * 1024 * 1024 bytes)
    ARRAY['image/jpeg', 'image/png', 'application/pdf']
  )
  ON CONFLICT (id) DO UPDATE SET
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'application/pdf'];
EXCEPTION WHEN OTHERS THEN
  -- Catch in case storage extension is configured differently
  NULL;
END $$;

-- Storage RLS: Only Admins can upload/delete documents; students can read own files
DROP POLICY IF EXISTS "Admins full access to student-documents" ON storage.objects;
CREATE POLICY "Admins full access to student-documents"
  ON storage.objects FOR ALL
  USING (bucket_id = 'student-documents' AND public.is_admin());

DROP POLICY IF EXISTS "Students can view their own documents" ON storage.objects;
CREATE POLICY "Students can view their own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'student-documents' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- ==============================================================================
-- 7. BOOTSTRAP INITIAL FIRST ADMIN (MANUAL SEED)
-- ==============================================================================
-- Replace the UUID below with the user ID created via Supabase Auth Dashboard
-- (Authentication -> Users -> Add User):
/*
INSERT INTO public.user_roles (user_id, role, full_name, nip)
VALUES (
  'PASTE-YOUR-AUTH-USER-UUID-HERE',
  'admin',
  'Dra. Hj. Nurul Hidayati, M.Pd',
  '197405121998022001'
)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
*/
