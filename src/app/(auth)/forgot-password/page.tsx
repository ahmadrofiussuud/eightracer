"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EightracerLogo } from "@/components/ui/EightracerLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <EightracerLogo size={48} withBackground />
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tight text-white">
            Eight<span className="text-indigo-400">racer</span>
          </span>
          <span className="text-xs text-slate-400">Pemulihan Akun</span>
        </div>
      </Link>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-slate-200 shadow-2xl">
        <CardHeader className="space-y-1.5 text-center pb-4">
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
            Lupa Kata Sandi?
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Masukkan email terdaftar untuk menerima tautan instruksi reset kata sandi.
          </CardDescription>
        </CardHeader>

        {submitted ? (
          <CardContent className="space-y-4 text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Tautan Terkirim!</h3>
            <p className="text-xs text-slate-500">
              Silakan periksa kotak masuk email <strong>{email}</strong> untuk mengatur ulang kata sandi Anda.
            </p>
            <Link href="/login" className="inline-block mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                Kembali ke Login
              </Button>
            </Link>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Akun</label>
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

              <Button
                type="submit"
                className="w-full py-2.5 font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
              >
                <Send className="w-4 h-4 mr-1.5" />
                <span>Kirim Tautan Reset</span>
              </Button>
            </CardContent>

            <CardFooter className="pt-0 flex justify-center text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Login</span>
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
