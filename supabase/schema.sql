-- ============================================================
-- EIGHTRACER - SMAN 8 JAKARTA DATABASE SCHEMA MIGRATION
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'student')),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nisn VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for user_roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_email ON public.user_roles(email);

-- 3. STUDENTS TABLE (DAFTAR INDUK SISWA)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(10) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    ppdb_track VARCHAR(100) DEFAULT 'Zonasi',
    average_report_score NUMERIC(5,2) DEFAULT 88.50,
    economic_status VARCHAR(100) DEFAULT 'Mampu',
    status VARCHAR(50) DEFAULT 'Aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for students
CREATE INDEX IF NOT EXISTS idx_students_nisn ON public.students(nisn);
CREATE INDEX IF NOT EXISTS idx_students_class_name ON public.students(class_name);

-- 4. ALUMNI TRACER TABLE
CREATE TABLE IF NOT EXISTS public.alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(10) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    graduation_year INT NOT NULL,
    high_school_class VARCHAR(50) DEFAULT 'XII MIPA 1',
    university VARCHAR(255) NOT NULL,
    faculty VARCHAR(255) DEFAULT 'Fakultas Utama',
    major VARCHAR(255) NOT NULL,
    admission_path VARCHAR(50) NOT NULL DEFAULT 'SNBP',
    current_semester INT DEFAULT 4,
    cumulative_gpa NUMERIC(4,2) DEFAULT 3.75,
    ukt_tier VARCHAR(100) DEFAULT 'Golongan 1 (Subsidi KIP-K)',
    scholarship_status VARCHAR(100) DEFAULT 'KIP-Kuliah',
    status VARCHAR(50) DEFAULT 'Aktif Berprestasi',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for alumni
CREATE INDEX IF NOT EXISTS idx_alumni_nisn ON public.alumni(nisn);
CREATE INDEX IF NOT EXISTS idx_alumni_university ON public.alumni(university);
CREATE INDEX IF NOT EXISTS idx_alumni_scholarship ON public.alumni(scholarship_status);

-- 5. SEED INITIAL SAMPLE DATA (SMAN 8 JAKARTA)
INSERT INTO public.students (nisn, full_name, class_name, ppdb_track, average_report_score, economic_status)
VALUES
    ('0058291044', 'Ahmad Fauzan Rifqi', 'XII MIPA 1', 'Prestasi Akademik', 92.40, 'Prasejahtera (KIP)'),
    ('0059123847', 'Nabila Putri Kirana', 'XII MIPA 3', 'Zonasi', 90.15, 'Mampu'),
    ('0057482910', 'Muhammad Rizky Pratama', 'XII IPS 1', 'Prestasi Akademik', 88.90, 'Rentan Miskin'),
    ('0056391028', 'Siti Sarah Nurhaliza', 'XII MIPA 2', 'Afirmasi / KETM', 91.80, 'Prasejahtera (KIP)'),
    ('0051234567', 'Budi Santoso', 'XII IPS 2', 'Zonasi', 86.50, 'Mampu')
ON CONFLICT (nisn) DO NOTHING;

INSERT INTO public.alumni (nisn, full_name, graduation_year, high_school_class, university, faculty, major, admission_path, current_semester, cumulative_gpa, ukt_tier, scholarship_status, status)
VALUES
    ('0058291044', 'Ahmad Fauzan Rifqi', 2022, 'XII MIPA 1', 'Universitas Indonesia', 'Fakultas Ilmu Komputer', 'Ilmu Komputer', 'SNBP', 6, 3.88, 'Golongan 1 (Subsidi KIP-K)', 'KIP-Kuliah', 'Aktif Berprestasi'),
    ('0059123847', 'Nabila Putri Kirana', 2022, 'XII MIPA 3', 'Institut Teknologi Bandung', 'STEI', 'Teknik Elektro', 'SNBP', 6, 3.75, 'Golongan 4', 'Non-Beasiswa', 'Aktif'),
    ('0057482910', 'Muhammad Rizky Pratama', 2022, 'XII IPS 1', 'Universitas Gadjah Mada', 'Fakultas Ekonomika dan Bisnis', 'Manajemen Keuangan', 'SNBT', 6, 3.62, 'Golongan 2', 'KIP-Kuliah', 'Aktif')
ON CONFLICT DO NOTHING;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public read access to alumni" ON public.alumni FOR SELECT USING (true);
CREATE POLICY "Allow public read access to user_roles" ON public.user_roles FOR SELECT USING (true);

-- Authenticated full access policies
CREATE POLICY "Allow full access for authenticated users to students" ON public.students FOR ALL USING (true);
CREATE POLICY "Allow full access for authenticated users to alumni" ON public.alumni FOR ALL USING (true);
CREATE POLICY "Allow full access for authenticated users to user_roles" ON public.user_roles FOR ALL USING (true);
