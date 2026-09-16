-- ============================================================
-- EIGHTRACER - RLS SECURITY POLICIES
-- Disesuaikan dengan struktur tabel yang ADA di Supabase:
--   students, user_roles, alumni_admissions, alumni_progress,
--   assessments, eligibility_data, family_backgrounds
-- Aman dijalankan berkali-kali (idempotent)
-- ============================================================

-- 1. Aktifkan RLS di semua tabel yang ada
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_backgrounds ENABLE ROW LEVEL SECURITY;

-- 2. Hapus policy lama biar tidak duplikat
DROP POLICY IF EXISTS "Authenticated users can read students" ON public.students;
DROP POLICY IF EXISTS "Only admins can insert students" ON public.students;
DROP POLICY IF EXISTS "Only admins can update students" ON public.students;
DROP POLICY IF EXISTS "Only admins can delete students" ON public.students;

DROP POLICY IF EXISTS "Authenticated users can read user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage user_roles" ON public.user_roles;

DROP POLICY IF EXISTS "Authenticated users can read alumni_admissions" ON public.alumni_admissions;
DROP POLICY IF EXISTS "Only admins can insert alumni_admissions" ON public.alumni_admissions;
DROP POLICY IF EXISTS "Only admins can update alumni_admissions" ON public.alumni_admissions;
DROP POLICY IF EXISTS "Only admins can delete alumni_admissions" ON public.alumni_admissions;

DROP POLICY IF EXISTS "Authenticated users can read alumni_progress" ON public.alumni_progress;
DROP POLICY IF EXISTS "Only admins can insert alumni_progress" ON public.alumni_progress;
DROP POLICY IF EXISTS "Only admins can update alumni_progress" ON public.alumni_progress;
DROP POLICY IF EXISTS "Only admins can delete alumni_progress" ON public.alumni_progress;

DROP POLICY IF EXISTS "Authenticated users can read assessments" ON public.assessments;
DROP POLICY IF EXISTS "Only admins can manage assessments" ON public.assessments;

DROP POLICY IF EXISTS "Authenticated users can read eligibility_data" ON public.eligibility_data;
DROP POLICY IF EXISTS "Only admins can manage eligibility_data" ON public.eligibility_data;

DROP POLICY IF EXISTS "Authenticated users can read family_backgrounds" ON public.family_backgrounds;
DROP POLICY IF EXISTS "Only admins can manage family_backgrounds" ON public.family_backgrounds;

-- ============================================================
-- 3. TABEL: students
-- ============================================================
CREATE POLICY "Authenticated users can read students"
  ON public.students FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert students"
  ON public.students FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can update students"
  ON public.students FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can delete students"
  ON public.students FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 4. TABEL: user_roles
-- ============================================================
CREATE POLICY "Authenticated users can read user_roles"
  ON public.user_roles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage user_roles"
  ON public.user_roles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 5. TABEL: alumni_admissions
-- ============================================================
CREATE POLICY "Authenticated users can read alumni_admissions"
  ON public.alumni_admissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert alumni_admissions"
  ON public.alumni_admissions FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can update alumni_admissions"
  ON public.alumni_admissions FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can delete alumni_admissions"
  ON public.alumni_admissions FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 6. TABEL: alumni_progress
-- ============================================================
CREATE POLICY "Authenticated users can read alumni_progress"
  ON public.alumni_progress FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can insert alumni_progress"
  ON public.alumni_progress FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can update alumni_progress"
  ON public.alumni_progress FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can delete alumni_progress"
  ON public.alumni_progress FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 7. TABEL: assessments, eligibility_data, family_backgrounds
-- ============================================================
CREATE POLICY "Authenticated users can read assessments"
  ON public.assessments FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage assessments"
  ON public.assessments FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can read eligibility_data"
  ON public.eligibility_data FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage eligibility_data"
  ON public.eligibility_data FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can read family_backgrounds"
  ON public.family_backgrounds FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage family_backgrounds"
  ON public.family_backgrounds FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );
