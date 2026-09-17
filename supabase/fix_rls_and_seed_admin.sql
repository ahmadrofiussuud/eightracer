-- ============================================================
-- EIGHTRACER - FIX RLS & SEED ADMIN PERTAMA
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── STEP 1: Fix RLS user_roles agar user bisa baca role sendiri ─────────────
-- Policy lama: semua authenticated bisa baca semua row (terlalu permisif)
-- Policy baru: setiap user hanya bisa baca row miliknya (+ admin bisa baca semua)

DROP POLICY IF EXISTS "Authenticated users can read user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage user_roles" ON public.user_roles;

-- User bisa baca role dirinya sendiri (wajib agar login bisa cek role)
CREATE POLICY "Users can read own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Admin bisa baca semua role
CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Hanya admin yang bisa insert/update/delete user_roles
CREATE POLICY "Only admins can insert user_roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update user_roles"
  ON public.user_roles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete user_roles"
  ON public.user_roles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ── STEP 2: Seed admin pertama ke user_roles ────────────────────────────────
-- Otomatis mengambil UUID dari auth.users berdasarkan email
-- Aman dijalankan berkali-kali

INSERT INTO public.user_roles (user_id, role, full_name, email)
SELECT
    id,
    'admin',
    'Admin SMAN 8 Jakarta',
    email
FROM auth.users
WHERE email = 'admin@sman8.sch.id'
ON CONFLICT (email) DO NOTHING;

-- ── STEP 3: Verifikasi ───────────────────────────────────────────────────────
SELECT
    u.email,
    r.role,
    r.full_name,
    r.created_at
FROM public.user_roles r
JOIN auth.users u ON u.id = r.user_id
WHERE u.email = 'admin@sman8.sch.id';
