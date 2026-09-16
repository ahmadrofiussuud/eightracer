"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Sparkles,
  Compass,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentHomePage() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Student Welcome Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-800 to-indigo-950 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-bl from-emerald-400/20 via-teal-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Portal Mandiri Siswa SMAN 8 Jakarta</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Halo, Ahmad Fauzan Rifqi!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Selamat! Anda masuk dalam kuota 40% siswa eligible SNBP 2025. Terus pantau jadwal pendaftaran dan bimbingan guru BK Anda.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-center min-w-[200px] shrink-0">
            <span className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider">
              Status Kelayakan SNBP
            </span>
            <div className="text-xl font-extrabold text-white mt-0.5">
              Eligible (Kuota 40%)
            </div>
            <span className="text-[11px] text-emerald-300 font-bold mt-0.5">
              Peringkat 4 Paralel MIPA
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-5 border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Rata-rata Rapor (Sem 1-5)</span>
          <div className="text-3xl font-black text-slate-900 mt-1">92.40</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Konsisten Meningkat (+1.8 pts)</span>
        </Card>

        <Card className="p-5 border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Poin Sertifikat Prestasi</span>
          <div className="text-3xl font-black text-indigo-600 mt-1">+10.0 Pts</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Juara 1 OSK Informatika</span>
        </Card>

        <Card className="p-5 border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Peluang Beasiswa KIP-K</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">Sangat Tinggi</div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Sinkronisasi Data Kemendikbud</span>
        </Card>
      </div>

      {/* Target Program Studi & Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Target Pilihan SNBP */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Rencana Program Studi Pilihan</span>
              </CardTitle>
              <Badge variant="default" className="text-[10px] bg-indigo-600">
                SNBP 2025
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Tervalidasi oleh Koordinator Guru BK SMAN 8.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-700">Pilihan 1:</span>
                <Badge variant="success" className="text-[10px]">Peluang 92%</Badge>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">S1 Ilmu Komputer</h4>
              <p className="text-slate-500 text-[11px]">Universitas Indonesia (UI) • Daya Tampung: 45 Kursi</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Pilihan 2:</span>
                <Badge variant="outline" className="text-[10px]">Peluang 88%</Badge>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">S1 Teknik Informatika (STEI)</h4>
              <p className="text-slate-500 text-[11px]">Institut Teknologi Bandung (ITB) • Daya Tampung: 60 Kursi</p>
            </div>

            <div className="pt-2">
              <Link href="/student/eligibilitas">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                  <span>Lihat Detail Kriteria & Skor Eligibilitas</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Hasil Asesmen Psikotes & Minat */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Hasil Asesmen Minat Karir (Holland)</span>
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                RIASEC IRC
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Hasil tes psikologi yang dilaksanakan bulan November 2024.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Tipe Kepribadian Karir:</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                Investigative, Realistic, Conventional (IRC)
              </p>
              <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                Kecocokan tertinggi pada pemecahan masalah analitis, pemrograman algoritma, serta riset teknologi rekayasa.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-950">
              <span className="font-bold block text-emerald-900">Catatan Konselor:</span>
              Pilihan prodi Ilmu Komputer UI sangat selaras dengan minat dan bakat Anda. Tetap jaga nilai rapor semester 5.
            </div>

            <Link href="/student/tracer">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Lihat Cerita Alumni di Fasilkom UI</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
