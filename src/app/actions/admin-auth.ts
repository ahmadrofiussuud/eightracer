"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { createAdminSchema } from "@/lib/validations/admin";
import { supabaseAdmin, isServiceRoleConfigured } from "@/lib/supabase-admin";

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

const ADMIN_SESSION_COOKIE = "eightracer_admin_session";
const SESSION_DURATION_SECONDS = 72 * 60 * 60; // Exactly 72 hours (3 days)

/**
 * Restricted Admin Account Creation Server Action
 * STRICT CHECK: Can ONLY be executed by an active, authenticated Admin.
 */
export async function createAdminAccountAction(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  // 1. Check Caller Session
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  // In development fallback mode without Supabase live, allow testing with mock acknowledgment
  if (!isServiceRoleConfigured) {
    const rawData = {
      fullName: formData.get("fullName"),
      nip: formData.get("nip"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const parsed = createAdminSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validasi data admin gagal.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    return {
      success: true,
      message: `[Dev Mode] Akun admin ${parsed.data.fullName} (${parsed.data.email}) berhasil dibuat secara lokal.`,
    };
  }

  // 2. Validate current caller session in DB
  if (!sessionToken) {
    return {
      success: false,
      message: "Akses ditolak: Anda harus login sebagai Admin terlebih dahulu.",
    };
  }

  const { data: sessionData, error: sessionErr } = await supabaseAdmin
    .from("admin_sessions")
    .select("user_id, is_active")
    .eq("session_token", sessionToken)
    .eq("is_active", true)
    .single();

  if (sessionErr || !sessionData) {
    return {
      success: false,
      message: "Sesi admin tidak valid atau telah digantikan oleh login perangkat lain.",
    };
  }

  // Verify caller has role 'admin'
  const { data: callerRole } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", sessionData.user_id)
    .eq("role", "admin")
    .single();

  if (!callerRole) {
    return {
      success: false,
      message: "Hanya pengguna dengan wewenang Admin Sekolah yang dapat membuat admin baru.",
    };
  }

  // 3. Validate form inputs with Zod
  const rawData = {
    fullName: formData.get("fullName"),
    nip: formData.get("nip"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = createAdminSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Periksa kembali isian formulir pendaftaran admin.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName, nip } = parsed.data;

  // 4. Create User in Supabase Auth via Admin API
  const { data: createdUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      nip,
      role: "admin",
    },
  });

  if (authError || !createdUser.user) {
    return {
      success: false,
      message: authError?.message || "Gagal membuat akun admin baru di Supabase Auth.",
    };
  }

  // 5. Insert role into user_roles
  const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
    user_id: createdUser.user.id,
    role: "admin",
    full_name: fullName,
    nip: nip,
  });

  if (roleError) {
    console.error("[Role Insertion Error]", roleError);
    // Rollback user creation if role assignment fails
    await supabaseAdmin.auth.admin.deleteUser(createdUser.user.id);
    return {
      success: false,
      message: "Gagal menetapkan peran admin pada basis data.",
    };
  }

  // 6. Record in Audit Logs
  await supabaseAdmin.from("admin_audit_logs").insert({
    performed_by: sessionData.user_id,
    action: "CREATE_ADMIN_ACCOUNT",
    target_user_id: createdUser.user.id,
    details: { email, fullName, nip },
  });

  return {
    success: true,
    message: `Akun Admin baru (${fullName}) berhasil dibuat dan terverifikasi.`,
  };
}

/**
 * Register a new Admin session (Single Device Login Enforcement)
 * Invalidates any existing active session for this admin.
 */
export async function createAdminDeviceSession(
  userId: string,
  deviceInfo: string = "Desktop Browser"
): Promise<string> {
  const newSessionToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000).toISOString();

  if (isServiceRoleConfigured) {
    // 1. Invalidate all previous active sessions for this admin (Single Device Login)
    await supabaseAdmin
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("user_id", userId)
      .eq("is_active", true);

    // 2. Insert newly generated active session
    await supabaseAdmin.from("admin_sessions").insert({
      user_id: userId,
      session_token: newSessionToken,
      device_info: deviceInfo,
      is_active: true,
      expires_at: expiresAt,
    });
  }

  // 3. Set secure httpOnly cookie with 72-hour expiry
  cookies().set({
    name: ADMIN_SESSION_COOKIE,
    value: newSessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return newSessionToken;
}

/**
 * Logout and invalidate session
 */
export async function logoutAdminAction(): Promise<void> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token && isServiceRoleConfigured) {
    await supabaseAdmin
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("session_token", token);
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
