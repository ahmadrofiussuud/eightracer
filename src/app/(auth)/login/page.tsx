"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  School,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { EightracerLogo } from "@/components/ui/EightracerLogo";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSwitch = (newRole: "admin" | "student") => {
    setRole(newRole);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !authData.user) {
        setError("Email atau kata sandi salah. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .single();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        // PGRST116 = no rows found; lainnya = permission / RLS error
        const isNotFound = roleError?.code === "PGRST116" || !roleData;
        setError(
          isNotFound
            ? "Akun Anda belum terdaftar di sistem. Hubungi Admin Sekolah untuk mendaftarkan akun ini."
            : "Gagal memverifikasi peran akun. Pastikan koneksi stabil dan coba lagi."
        );
        setLoading(false);
        return;
      }

      if (role === "admin" && roleData.role !== "admin") {
        await supabase.auth.signOut();
        setError("Akun ini bukan Admin Sekolah. Gunakan tab Siswa untuk login.");
        setLoading(false);
        return;
      }

      if (role === "student" && roleData.role !== "student") {
        await supabase.auth.signOut();
        setError("Akun ini bukan Siswa. Gunakan tab Admin Sekolah untuk login.");
        setLoading(false);
        return;
      }

      router.push(roleData.role === "admin" ? "/admin" : "/student");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* ── LEFT PANEL (decorative) ── */}
      <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 ${isAdmin ? "bg-indigo-600" : "bg-emerald-600"}`}>
        {/* Shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-tr-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-20 h-20 rounded-full bg-yellow-400/30 pointer-events-none" />
        <div className="absolute bottom-32 right-20 w-10 h-10 rounded-full bg-white/20 pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <EightracerLogo size={40} withBackground />
          <div>
            <div className="font-black text-xl text-white tracking-tight">Eightracer</div>
            <div className="text-xs text-white/60">SMAN 8 Jakarta</div>
          </div>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-3 leading-tight">
            {isAdmin
              ? "Kelola data siswa & alumni dengan mudah"
              : "Pantau progres perjalanan akademikmu"}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            {isAdmin
              ? "Dashboard analitik beasiswa, linimasa alumni, dan penentuan eligibilitas KIP-Kuliah dalam satu platform."
              : "Lihat status eligibilitas, riwayat asesmen, dan timeline perjalananmu dari SMA ke PTN."}
          </p>

          {/* Mini stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {(isAdmin
              ? [
                  { icon: GraduationCap, value: "248+", label: "Alumni" },
                  { icon: BarChart3, value: "89", label: "KIP-K" },
                  { icon: TrendingUp, value: "3.72", label: "Avg IPK" },
                ]
              : [
                  { icon: GraduationCap, value: "34", label: "PTN Mitra" },
                  { icon: BarChart3, value: "89", label: "Penerima KIP" },
                  { icon: TrendingUp, value: "88.5%", label: "Masuk PTN" },
                ]
            ).map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-3 border border-white/20 text-white text-center">
                <s.icon className="w-4 h-4 mx-auto mb-1 opacity-70" />
                <div className="text-lg font-black">{s.value}</div>
                <div className="text-[10px] opacity-60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 text-white/40 text-xs">
          © 2025 Eightracer · SMAN 8 Jakarta
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col">
        {/* Mobile navbar */}
        <header className="lg:hidden bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <EightracerLogo size={32} withBackground />
            <span className="font-black text-slate-900">Eight<span className="text-indigo-600">racer</span></span>
          </Link>
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 font-medium">← Beranda</Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
          <div className="w-full max-w-sm">

            {/* Header */}
            <div className="mb-7">
              <h1 className="text-2xl font-black text-slate-900">Masuk ke Portal</h1>
              <p className="text-sm text-slate-400 mt-1">Pilih peran lalu masukkan kredensial</p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => handleRoleSwitch("admin")}
                className={`py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  role === "admin"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Admin
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("student")}
                className={`py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  role === "student"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <UserCheck className="w-4 h-4" /> Siswa
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-5">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  {isAdmin ? "Email Admin" : "Email Siswa"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder={isAdmin ? "admin@sman8.sch.id" : "siswa@email.com"}
                    required
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600">Kata Sandi</label>
                  <Link href="/forgot-password" className="text-[11px] font-semibold text-indigo-600 hover:underline">
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Masukkan kata sandi"
                    required
                    className="w-full pl-10 pr-11 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full h-12 font-bold text-sm rounded-xl shadow-sm transition-all ${
                  isAdmin
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </span>
                ) : (
                  <>
                    Masuk sebagai {isAdmin ? "Admin" : "Siswa"}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
              <p className="text-xs text-slate-500">
                Belum punya akun?{" "}
                <Link href="/register" className="font-bold text-indigo-600 hover:underline">Aktivasi Akun Siswa</Link>
              </p>
              <p className="text-xs text-slate-400">
                <Link href="/admin/alumni-beasiswa/analitik" className="hover:text-indigo-600 transition-colors">
                  Eksplor demo tanpa login →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
