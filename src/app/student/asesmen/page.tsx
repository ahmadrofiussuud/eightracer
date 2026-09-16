"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, Brain, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentAsesmenRiwayatPage() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Riwayat Asesmen Karakteristik & Minat</h1>
        <p className="text-xs text-slate-500">Hasil resmi asesmen psikologi dan pemetaan karir perguruan tinggi (Read-Only).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-emerald-50/70 to-white border-emerald-100">
          <span className="text-xs font-semibold text-slate-500">Tipe Holland Code</span>
          <div className="text-2xl font-black text-emerald-900 mt-1">IRC</div>
          <span className="text-[11px] text-emerald-700 font-medium">Investigative • Realistic • Conventional</span>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-indigo-50/70 to-white border-indigo-100">
          <span className="text-xs font-semibold text-slate-500">Gaya Belajar Dominan</span>
          <div className="text-2xl font-black text-indigo-900 mt-1">Visual & Kinestetik</div>
          <span className="text-[11px] text-indigo-700 font-medium">Praktikum & Analisis Diagram</span>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-50/70 to-white border-amber-100">
          <span className="text-xs font-semibold text-slate-500">Kesiapan Seleksi PTN</span>
          <div className="text-2xl font-black text-amber-900 mt-1">Sangat Siap</div>
          <span className="text-[11px] text-amber-700 font-medium">Konsistensi Rapor & Minat Tinggi</span>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Program Studi yang Direkomendasikan</CardTitle>
          <CardDescription className="text-xs">Berdasarkan hasil analisis kecocokan minat, kemampuan kuantitatif, dan skor psikotes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm block">1. S1 Ilmu Komputer - Universitas Indonesia</span>
              <span className="text-slate-500 text-[11px]">Kesesuaian Minat: 96% • Potensi Karir: Software Engineer / AI Researcher</span>
            </div>
            <Badge variant="success" className="text-[10px]">Sangat Disarankan</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm block">2. S1 Teknik Informatika (STEI) - ITB</span>
              <span className="text-slate-500 text-[11px]">Kesesuaian Minat: 94% • Potensi Karir: Computer Scientist / Tech Lead</span>
            </div>
            <Badge variant="success" className="text-[10px]">Sangat Disarankan</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm block">3. S1 Sistem Informasi - ITS Surabaya</span>
              <span className="text-slate-500 text-[11px]">Kesesuaian Minat: 89% • Potensi Karir: Product Manager / Data Analyst</span>
            </div>
            <Badge variant="secondary" className="text-[10px]">Pilihan Alternatif</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
