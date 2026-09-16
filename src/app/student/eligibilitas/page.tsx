"use client";

import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, Sparkles, BookOpen, Download, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentEligibilitasPage() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cek Status Eligibilitas SNBP Mandiri</h1>
        <p className="text-xs text-slate-500">Informasi resmi pemeringkatan kuota 40% siswa berprestasi SMAN 8 Jakarta.</p>
      </div>

      {/* Status Banner */}
      <Card className="border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-emerald-950">Status: Eligible Kuota SNBP 40%</h3>
                <Badge variant="success" className="text-[10px]">Tervalidasi</Badge>
              </div>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Anda berada pada <strong>Peringkat 4</strong> dari 180 siswa MIPA SMAN 8 Jakarta dan berhak mendaftar pada portal SNPMB Kemendikbudristek.
              </p>
            </div>
          </div>

          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 self-start sm:self-auto">
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Unduh Surat Keterangan</span>
          </Button>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <Card className="p-4">
          <span className="text-slate-500 font-semibold block text-[11px]">Nilai Rata-rata Rapor (75%)</span>
          <div className="text-2xl font-black text-slate-900 mt-1">92.40</div>
          <span className="text-slate-400 text-[10px] mt-0.5 block">Akumulasi Semester 1 s.d. 5</span>
        </Card>

        <Card className="p-4">
          <span className="text-slate-500 font-semibold block text-[11px]">Poin Kejuaraan Resmi (25%)</span>
          <div className="text-2xl font-black text-indigo-600 mt-1">+10.0 Pts</div>
          <span className="text-slate-400 text-[10px] mt-0.5 block">Sertifikat Juara 1 OSK Informatika</span>
        </Card>

        <Card className="p-4">
          <span className="text-slate-500 font-semibold block text-[11px]">Nilai Akhir Pemeringkatan</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">94.40</div>
          <span className="text-emerald-700 font-bold text-[10px] mt-0.5 block">Peringkat 4 Paralel Sekolah</span>
        </Card>
      </div>

      {/* Timeline Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tahapan Seleksi SNBP 2025</CardTitle>
          <CardDescription className="text-xs">Jadwal resmi dari panitia Seleksi Nasional Penerimaan Mahasiswa Baru (SNPMB).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">1. Pengumuman Kuota & Finalisasi Siswa Eligible</strong>
              <span className="text-slate-500 text-[11px]">Status: Selesai • SMAN 8 menetapkan 120 siswa eligible.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50/50 border border-indigo-100">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">2. Registrasi Akun Siswa & Pendaftaran Pilihan PTN</strong>
              <span className="text-indigo-700 text-[11px] font-semibold">Status: Sedang Berlangsung • Batas akhir: 28 Februari 2025</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">3. Pengumuman Hasil Kelulusan SNBP</strong>
              <span className="text-slate-500 text-[11px]">Jadwal: 25 Maret 2025 via portal resmi SNPMB.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
