import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/bootstrap-admin
// Memanggil RPC bootstrap_first_admin di Supabase.
// Hanya berhasil jika:
//   1. User sudah login (ada Authorization header dengan access token)
//   2. Belum ada admin sama sekali di user_roles
// Setelah ada admin, fungsi Postgres otomatis menolak semua panggilan berikutnya.
export async function POST(req: NextRequest) {
  try {
    const { email, fullName } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email wajib diisi." },
        { status: 400 }
      );
    }

    // Ambil access token dari Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Anda harus login terlebih dahulu." },
        { status: 401 }
      );
    }
    const accessToken = authHeader.slice(7);

    // Buat client dengan token user (bukan service role)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      }
    );

    // Panggil Postgres RPC SECURITY DEFINER
    const { data, error } = await supabase.rpc("bootstrap_first_admin", {
      p_email: email,
      p_full_name: fullName || "Admin SMAN 8 Jakarta",
    });

    if (error) {
      console.error("[Bootstrap Admin RPC Error]", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[Bootstrap Admin Error]", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
