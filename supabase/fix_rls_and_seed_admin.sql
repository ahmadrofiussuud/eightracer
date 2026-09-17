-- ============================================================
-- EIGHTRACER - BOOTSTRAP ADMIN (Jalankan di Supabase SQL Editor)
-- https://supabase.com/dashboard/project/glzctrtwtnlwfiwfqeub/sql/new
-- ============================================================

-- 1. Buat function SECURITY DEFINER agar bisa bypass RLS
--    untuk seed admin pertama saja
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(
  p_email TEXT,
  p_full_name TEXT DEFAULT 'Admin SMAN 8 Jakarta'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER  -- runs as DB owner, bypasses RLS
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_existing_admin_count INT;
  v_result json;
BEGIN
  -- Block if admin already exists (security guard)
  SELECT COUNT(*) INTO v_existing_admin_count
  FROM public.user_roles
  WHERE role = 'admin';

  IF v_existing_admin_count > 0 THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Admin sudah ada. Fungsi ini hanya untuk setup awal.'
    );
  END IF;

  -- Get user_id from auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'User dengan email tersebut tidak ditemukan di Supabase Auth.'
    );
  END IF;

  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role, full_name, email)
  VALUES (v_user_id, 'admin', p_full_name, p_email)
  ON CONFLICT (email) DO NOTHING;

  RETURN json_build_object(
    'success', true,
    'message', 'Admin berhasil didaftarkan.',
    'user_id', v_user_id::text,
    'email', p_email
  );
END;
$$;

-- 2. Izinkan fungsi ini dipanggil oleh user terotentikasi (via Supabase RPC)
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(TEXT, TEXT) TO authenticated;

-- 3. (Opsional) Test langsung dari SQL Editor:
-- SELECT public.bootstrap_first_admin('admin@sman8.sch.id');
