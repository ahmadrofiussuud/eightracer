"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { School, ArrowRight, AlertCircle, CheckCircle2, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [nisn, setNisn] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("register_email");
    const storedNisn = sessionStorage.getItem("register_nisn");

    if (!storedEmail) {
      router.push("/register");
      return;
    }

    setEmail(storedEmail);
    setNisn(storedNisn || "");
  }, [router]);

  // Countdown resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length < 6) {
      setError("Masukkan 6 digit kode OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verifikasi OTP
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (verifyError || !data.user) {
        setError("Kode OTP salah atau sudah kedaluwarsa. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // Insert ke user_roles sebagai student
      const fullName = sessionStorage.getItem("register_name") || "";
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: data.user.id,
        role: "student",
        full_name: fullName,
        email: email,
        nisn: nisn,
      });

      if (roleError) {
        console.error("Role insert error:", roleError);
        // Tetap lanjutkan meskipun gagal insert role (bisa di-retry)
      }

      // Bersihkan sessionStorage
      sessionStorage.removeItem("register_email");
      sessionStorage.removeItem("register_nisn");
      sessionStorage.removeItem("register_name");

      setSuccess(true);

      // Redirect ke student dashboard
      setTimeout(() => router.push("/student"), 2000);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await supabase.auth.resend({
        type: "signup",
        email,
      });
      setCountdown(60);
      setCanResend(false);
    } catch {
      setError("Gagal mengirim ulang kode. Silakan coba lagi.");
    } finally {
      setResending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Akun Aktif!</h2>
          <p className="text-slate-500 text-sm mb-1">Selamat datang di Eightracer 🎉</p>
          <p className="text-slate-400 text-xs">Mengalihkan ke dashboard siswa...</p>
          <div className="mt-4 flex justify-center">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-emerald-600">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-tr-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-20 h-20 rounded-full bg-yellow-400/30 pointer-events-none" />

        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30">
            <School className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-xl text-white tracking-tight">Eightracer</div>
            <div className="text-xs text-white/60">SMAN 8 Jakarta</div>
          </div>
        </Link>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            Cek email kamu!
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Kami sudah mengirimkan kode OTP 6 digit ke:
          </p>
          <div className="bg-white/20 rounded-2xl px-4 py-3 border border-white/30 mb-6">
            <p className="text-white font-bold text-sm">{email}</p>
          </div>
          <div className="space-y-2 text-white/70 text-xs">
            <p>• Kode berlaku selama <strong className="text-white">10 menit</strong></p>
            <p>• Cek folder <strong className="text-white">Spam/Junk</strong> jika tidak masuk inbox</p>
            <p>• Jangan bagikan kode ini ke siapapun</p>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-xs">
          © 2025 Eightracer · SMAN 8 Jakarta
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden bg-white border-b border-slate-100 px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <School className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-900">Eight<span className="text-indigo-600">racer</span></span>
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
          <div className="w-full max-w-sm">

            <div className="mb-7">
              <h1 className="text-2xl font-black text-slate-900">Verifikasi Email</h1>
              <p className="text-sm text-slate-400 mt-1">
                Masukkan 6 digit kode yang dikirim ke{" "}
                <span className="font-semibold text-slate-600">{email}</span>
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl mb-5">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Input boxes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">Kode OTP</label>
                <div className="flex gap-2.5 justify-between" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-black bg-white border-2 rounded-xl focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        digit
                          ? "border-emerald-400 text-emerald-700 focus:ring-emerald-500/20"
                          : "border-slate-200 text-slate-900 focus:border-emerald-400 focus:ring-emerald-500/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Bisa paste langsung kode 6 digit dari email
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || otp.join("").length < 6}
                className="w-full h-12 font-bold text-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
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
                  <>Verifikasi & Aktifkan Akun <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
            </form>

            {/* Resend */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                  {resending ? "Mengirim ulang..." : "Kirim ulang kode OTP"}
                </button>
              ) : (
                <p className="text-xs text-slate-400">
                  Kirim ulang kode dalam{" "}
                  <span className="font-bold text-slate-600">{countdown}s</span>
                </p>
              )}
              <p className="text-xs text-slate-400">
                Email salah?{" "}
                <Link href="/register" className="font-bold text-indigo-600 hover:underline">
                  Kembali ke pendaftaran
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
