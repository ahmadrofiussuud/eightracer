"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileCheck2, Plus, Save, School, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InputKelolaTracerPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Input & Kelola Data Tracer Alumni</h1>
        <p className="text-xs text-slate-500">Pencatatan data kelulusan perguruan tinggi, fakultas, program studi, dan jalur masuk.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formulir Pendataan Alumni Baru</CardTitle>
          <CardDescription className="text-xs">Diisi berdasarkan hasil pengumuman resmi SNBP, SNBT, atau Ujian Mandiri PTN.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nama Lengkap Siswa</label>
              <input type="text" placeholder="Nama alumni" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">NISN Siswa</label>
              <input type="text" placeholder="10 digit NISN" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nama Perguruan Tinggi (PTN/PTS)</label>
              <input type="text" placeholder="Contoh: Universitas Indonesia" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Program Studi / Jurusan</label>
              <input type="text" placeholder="Contoh: S1 Ilmu Komputer" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Jalur Penerimaan</label>
              <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg">
                <option>SNBP (Prestasi)</option>
                <option>SNBT (UTBK)</option>
                <option>Seleksi Mandiri PTN</option>
                <option>Ikatan Dinas</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Tahun Kelulusan SMA</label>
              <input type="number" defaultValue={2024} className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/admin/tracer/list">
            <Button variant="outline" size="sm" className="text-xs">Lihat Daftar Alumni</Button>
          </Link>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">Simpan Data Tracer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
