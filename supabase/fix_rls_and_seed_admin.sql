-- ============================================================
-- EIGHTRACER - FIX & BOOTSTRAP ADMIN
-- Jalankan di: https://supabase.com/dashboard/project/glzctrtwtnlwfiwfqeub/sql/new
-- ============================================================

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(
  p_email TEXT,
  p_full_name TEXT DEFAULT 'Admin SMAN 8 Jakarta'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER  -- bypass RLS, runs as DB owner
SET search_path = public
AS $$
DECLARE
  v_auth_uid UUID;
  v_existing_row_id UUID;
  v_admin_count INT;
BEGIN
  -- Dapatkan UID dari user yang sedang login
  v_auth_uid := auth.uid();

  IF v_auth_uid IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Tidak ada sesi aktif.');
  END IF;

  -- Kasus 1: row dengan email ini sudah ada tapi user_id-nya beda
  -- (terjadi jika akun dihapus & dibuat ulang — UUID berubah)
  -- Solusi: update user_id agar sinkron dengan auth saat ini.
  SELECT id INTO v_existing_row_id
  FROM public.user_roles
  WHERE email = p_email AND role = 'admin'
  LIMIT 1;

  IF v_existing_row_id IS NOT NULL THEN
    UPDATE public.user_roles
    SET user_id = v_auth_uid
    WHERE email = p_email AND role = 'admin';

    RETURN json_build_object(
      'success', true,
      'message', 'Akun admin berhasil disinkronkan.'
    );
  END IF;

  -- Kasus 2: sudah ada admin dengan email lain — tolak
  SELECT COUNT(*) INTO v_admin_count
  FROM public.user_roles
  WHERE role = 'admin';

  IF v_admin_count > 0 THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Sudah ada admin lain di sistem. Hubungi Admin Sekolah.'
    );
  END IF;

  -- Kasus 3: belum ada admin sama sekali — insert baru
  INSERT INTO public.user_roles (user_id, role, full_name, email)
  VALUES (v_auth_uid, 'admin', p_full_name, p_email)
  ON CONFLICT (email) DO NOTHING;

  RETURN json_build_object(
    'success', true,
    'message', 'Admin berhasil didaftarkan.'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(TEXT, TEXT) TO authenticated;
