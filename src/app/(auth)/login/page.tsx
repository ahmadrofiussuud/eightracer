"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { School, Lock, Mail, ArrowRight, Sparkles, ShieldCheck, UserCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [email, setEmail] = useState("admin.bk@sman8.sch.id");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSwitch = (newRole: "admin" | "student") => {
    setRole(newRole);
    if (newRole === "admin") {
      setEmail("admin.bk@sman8.sch.id");
    } else {
      setEmail("ahmad.fauzan@student.sman8.sch.id");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Brand logo link */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <School className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tight text-white">
            Eight<span className="text-indigo-400">racer</span>
          </span>
          <span className="text-xs text-slate-400">SMAN 8 Jakarta</span>
        </div>
      </Link>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-slate-200 shadow-2xl">
        <CardHeader className="space-y-2 text-center pb-4">
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Masuk ke Portal
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Pilih peran Anda untuk mengakses sistem pelacakan Eightracer.
          </CardDescription>

          {/* Role selector tab */}
          <div className="pt-2 grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => handleRoleSwitch("admin")}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === "admin"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Sekolah</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSwitch("student")}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === "student"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Siswa / Alumni</span>
            </button>
          </div>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {role === "admin" ? "Email Admin / NIP" : "NISN / Email Siswa"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Kata Sandi</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-indigo-600 hover:underline"
                >
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full py-2.5 font-bold text-xs sm:text-sm shadow-md transition-all ${
                role === "admin"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
              }`}
            >
              <span>Masuk Sebagai {role === "admin" ? "Admin Sekolah" : "Siswa"}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </CardContent>

          <CardFooter className="pt-0 flex flex-col space-y-3 text-center">
            <p className="text-xs text-slate-500">
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-indigo-600 hover:underline">
                Aktivasi Akun Siswa
              </Link>
            </p>

            <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <Link href="/" className="hover:text-slate-600">Beranda Publik</Link>
              <span>•</span>
              <Link href="/admin/alumni-beasiswa/analitik" className="hover:text-slate-600">Eksplor Demo</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
