"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  School,
  Lock,
  Mail,
  User,
  Hash,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (!/^\d{10}$/.test(nisn)) {
      setError("NISN harus tepat 10 digit angka.");
      return;
    }

    setLoading(true);

    try {
      // 1. Cek NISN terdaftar di tabel students
      const { data: studentData, error: nisnError } = await supabase
        .from("students")
        .select("id, full_name, nisn")
        .eq("nisn", nisn)
        .single();

      if (nisnError || !studentData) {
        setError("NISN tidak ditemukan. Pastikan NISN kamu sudah terdaftar di sistem SMAN 8 Jakarta.");
        setLoading(false);
        return;
      }

      // 2. Cek email belum dipakai
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("id")
        .eq("email", email.trim())
        .single();

      if (existingRole) {
        setError("Email ini sudah terdaftar. Silakan login atau gunakan email lain.");
        setLoading(false);
        return;
      }

      // 3. Daftar ke Supabase Auth → kirim OTP ke email
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
            nisn,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Email ini sudah terdaftar. Silakan login.");
        } else {
          setError(signUpError.message);
        }
        setLoading(false);
        return;
      }

      // 4. Simpan data sementara di sessionStorage untuk halaman verify
      sessionStorage.setItem("register_email", email.trim());
      sessionStorage.setItem("register_nisn", nisn);
      sessionStorage.setItem("register_name", fullName);

      // 5. Arahkan ke halaman verifikasi OTP
      router.push("/register/verify");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-emerald-600">
        {/* Shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-tr-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-20 h-20 rounded-full bg-yellow-400/30 pointer-events-none" />
        <div className="absolute bottom-32 right-20 w-10 h-10 rounded-full bg-white/20 pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30">
            <School className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-xl text-white tracking-tight">Eightracer</div>
            <div className="text-xs text-white/60">SMAN 8 Jakarta</div>
          </div>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-3 leading-tight">
            Aktivasi akun siswa<br />SMAN 8 Jakarta
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Daftarkan diri menggunakan NISN resmi untuk mengakses portal siswa dan memantau perjalanan akademikmu.
          </p>

          {/* Steps */}
          <div className="space-y-3">
            {[
              { step: "1", text: "Isi data diri & NISN kamu" },
              { step: "2", text: "Cek email untuk kode OTP" },
              { step: "3", text: "Masukkan kode & akun aktif" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-black shrink-0">
                  {s.step}
                </div>
                <span className="text-white/80 text-sm">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini stat cards */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[
            { icon: GraduationCap, value: "248+", label: "Alumni" },
            { icon: ShieldCheck, value: "89", label: "KIP-K" },
            { icon: CheckCircle2, value: "34", label: "PTN Mitra" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-3 border border-white/20 text-white text-center">
              <s.icon className="w-4 h-4 mx-auto mb-1 opacity-70" />
              <div className="text-lg font-black">{s.value}</div>
              <div className="text-[10px] opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col">
        {/* Mobile navbar */}
        <header className="lg:hidden bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <School className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-900">Eight<span className="text-indigo-600">racer</span></span>
          </Link>
          <Link href="/login" className="text-xs text-slate-500 hover:text-slate-800 font-medium">Sudah punya akun?</Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10">
          <div className="w-full max-w-sm">

            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900">Aktivasi Akun Siswa</h1>
              <p className="text-sm text-slate-400 mt-1">Masukkan data diri sesuai data sekolah</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-5">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Nama */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); setError(""); }}
                    placeholder="Nama sesuai ijazah"
                    required
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* NISN */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">NISN <span className="text-slate-400 font-normal">(10 digit)</span></label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={nisn}
                    onChange={(e) => { setNisn(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                    placeholder="0123456789"
                    required
                    maxLength={10}
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors shadow-sm font-mono tracking-widest"
                  />
                </div>
                <p className="text-[11px] text-slate-400">NISN harus sudah terdaftar di sistem SMAN 8 Jakarta</p>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email Aktif</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-10 pr-3.5 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Minimal 8 karakter"
                    required
                    className="w-full pl-10 pr-11 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors shadow-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    placeholder="Ulangi kata sandi"
                    required
                    className={`w-full pl-10 pr-3.5 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors shadow-sm ${
                      confirmPassword && confirmPassword !== password
                        ? "border-red-300 focus:border-red-400"
                        : confirmPassword && confirmPassword === password
                        ? "border-emerald-300 focus:border-emerald-400"
                        : "border-slate-200 focus:border-emerald-400"
                    }`}
                  />
                  {confirmPassword && confirmPassword === password && (
                    <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 font-bold text-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <>Kirim Kode OTP <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
            </form>

            <div className="mt-5 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-bold text-indigo-600 hover:underline">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
