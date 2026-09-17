"use server";

import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { supabaseAdmin, isServiceRoleConfigured } from "@/lib/supabase-admin";
import { AlumniStudent } from "@/types/student";

export interface StudentRecord {
  id: string;
  fullName: string;
  nisn: string;
  className: string;
  ppdbTrack: string;
  averageReportScore: number;
  economicStatus?: string;
  status: string;
}

// ── Session Guard ─────────────────────────────────────────────────────────────
// Verifies that the caller has an active admin session before allowing mutations.
// READ operations are allowed without a session guard (RLS on Supabase handles data scoping).

const ADMIN_SESSION_COOKIE = "eightracer_admin_session";

async function assertAdminSession(): Promise<{ userId: string } | null> {
  // In dev/demo mode without Supabase, allow all operations
  if (!isSupabaseConfigured || !isServiceRoleConfigured) {
    return { userId: "dev-mode" };
  }

  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionToken) return null;

  // Verify session is still active in DB
  const { data, error } = await supabaseAdmin
    .from("admin_sessions")
    .select("user_id, is_active")
    .eq("session_token", sessionToken)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return { userId: data.user_id };
}

// ── STUDENT CRUD ──────────────────────────────────────────────────────────────

export async function fetchStudentsFromDb(): Promise<StudentRecord[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((item) => ({
      id: item.id || item.nisn,
      fullName: item.full_name || item.name,
      nisn: item.nisn,
      className: item.class_name || item.class || "XII MIPA 1",
      ppdbTrack: item.ppdb_track || "Zonasi",
      averageReportScore: item.average_report_score || item.gpa || 88.5,
      economicStatus: item.economic_status || "Mampu",
      status: "Aktif",
    }));
  } catch (err) {
    console.error("Error fetching students:", err);
    return [];
  }
}

export async function createStudentInDb(
  student: Omit<StudentRecord, "id" | "status">
) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) {
    return {
      success: true,
      data: { ...student, id: "STD-" + Date.now(), status: "Aktif" },
    };
  }
  try {
    const { data, error } = await supabase
      .from("students")
      .insert({
        full_name: student.fullName,
        nisn: student.nisn,
        class_name: student.className,
        ppdb_track: student.ppdbTrack,
        average_report_score: student.averageReportScore,
        economic_status: student.economicStatus || "Mampu",
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create student" };
  }
}

export async function updateStudentInDb(
  id: string,
  student: Partial<StudentRecord>
) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) return { success: true };
  try {
    const payload: any = {};
    if (student.fullName) payload.full_name = student.fullName;
    if (student.nisn) payload.nisn = student.nisn;
    if (student.className) payload.class_name = student.className;
    if (student.ppdbTrack) payload.ppdb_track = student.ppdbTrack;
    if (student.averageReportScore !== undefined)
      payload.average_report_score = student.averageReportScore;

    const { error } = await supabase
      .from("students")
      .update(payload)
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update student" };
  }
}

export async function deleteStudentFromDb(id: string) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) return { success: true };
  try {
    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete student" };
  }
}

// ── ALUMNI TRACER CRUD ────────────────────────────────────────────────────────

export async function fetchAlumniFromDb(): Promise<AlumniStudent[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("alumni")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((item) => ({
      id: item.id,
      nisn: item.nisn,
      fullName: item.full_name,
      graduationYear: item.graduation_year,
      highSchoolClass: item.high_school_class,
      university: item.university,
      faculty: item.faculty,
      major: item.major,
      admissionPath: item.admission_path,
      currentSemester: item.current_semester,
      cumulativeGpa: item.cumulative_gpa,
      uktTier: item.ukt_tier,
      uktFee: item.ukt_fee || 0,
      scholarshipStatus: item.scholarship_status,
      status: item.status,
    }));
  } catch (err) {
    console.error("Error fetching alumni:", err);
    return [];
  }
}

export async function createAlumniInDb(alumni: Omit<AlumniStudent, "id">) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) {
    return { success: true, data: { ...alumni, id: "ALM-" + Date.now() } };
  }
  try {
    const { data, error } = await supabase
      .from("alumni")
      .insert({
        nisn: alumni.nisn,
        full_name: alumni.fullName,
        graduation_year: alumni.graduationYear,
        high_school_class: alumni.highSchoolClass,
        university: alumni.university,
        faculty: alumni.faculty,
        major: alumni.major,
        admission_path: alumni.admissionPath,
        current_semester: alumni.currentSemester,
        cumulative_gpa: alumni.cumulativeGpa,
        ukt_tier: alumni.uktTier,
        scholarship_status: alumni.scholarshipStatus,
        status: alumni.status,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create alumni" };
  }
}

export async function updateAlumniInDb(
  id: string,
  alumni: Partial<AlumniStudent>
) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) return { success: true };
  try {
    const payload: any = {};
    if (alumni.fullName) payload.full_name = alumni.fullName;
    if (alumni.university) payload.university = alumni.university;
    if (alumni.major) payload.major = alumni.major;
    if (alumni.cumulativeGpa !== undefined)
      payload.cumulative_gpa = alumni.cumulativeGpa;
    if (alumni.scholarshipStatus)
      payload.scholarship_status = alumni.scholarshipStatus;
    if (alumni.status) payload.status = alumni.status;

    const { error } = await supabase
      .from("alumni")
      .update(payload)
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update alumni" };
  }
}

export async function deleteAlumniFromDb(id: string) {
  // ── Auth Guard ──
  const session = await assertAdminSession();
  if (!session) {
    return { success: false, error: "Akses ditolak: sesi admin tidak valid." };
  }

  if (!isSupabaseConfigured) return { success: true };
  try {
    const { error } = await supabase
      .from("alumni")
      .delete()
      .eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete alumni" };
  }
}
