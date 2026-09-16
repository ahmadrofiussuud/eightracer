"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { School, Lock, Mail, User, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/student");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
          <School className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tight text-white">
            Eight<span className="text-indigo-400">racer</span>
          </span>
          <span className="text-xs text-slate-400">Aktivasi Akun Siswa</span>
        </div>
      </Link>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-slate-200 shadow-2xl">
        <CardHeader className="space-y-1.5 text-center pb-4">
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Aktivasi Akun Siswa
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Daftarkan akun menggunakan data NISN resmi SMAN 8 Jakarta.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nama Lengkap Siswa</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nama sesuai ijazah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nomor Induk Siswa Nasional (NISN)</label>
              <input
                type="text"
                placeholder="10 digit NISN"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Aktif</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Kata Sandi Baru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
            >
              <span>Aktivasi Akun</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </CardContent>

          <CardFooter className="pt-0 flex flex-col space-y-3 text-center">
            <p className="text-xs text-slate-500">
              Sudah punya akun terdaftar?{" "}
              <Link href="/login" className="font-bold text-indigo-600 hover:underline">
                Masuk di sini
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
