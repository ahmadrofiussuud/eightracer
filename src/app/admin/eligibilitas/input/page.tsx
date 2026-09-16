"use client";

import React, { useState } from "react";
import { FileSpreadsheet, Upload, CheckCircle2, Award, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InputDataPendukungPage() {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Input Data Pendukung Eligibilitas</h1>
        <p className="text-xs text-slate-500">Unggah nilai rapor semester 1-5, rekap kehadiran, dan portofolio kejuaraan siswa kelas XII.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Upload Nilai Rapor */}
        <Card className="border-dashed border-2 border-slate-300 hover:border-indigo-500 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Import Nilai Rapor (Excel/CSV)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Format baku nilai pengetahuan semester 1 s.d. 5</p>
            </div>
            <Button
              onClick={() => setFileUploaded(true)}
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Pilih File Excel</span>
            </Button>
            {fileUploaded && (
              <span className="text-xs font-semibold text-emerald-600 block">
                ✓ 360 baris nilai rapor berhasil di-import
              </span>
            )}
          </CardContent>
        </Card>

        {/* Upload Sertifikat Prestasi */}
        <Card className="border-dashed border-2 border-slate-300 hover:border-emerald-500 transition-colors">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Input Portofolio Sertifikat Prestasi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sertifikat OSN, FLS2N, O2SN, dan Lomba Internasional</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Arsip Sertifikat</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ketentuan Pembobotan Skor SNBP SMAN 8</CardTitle>
          <CardDescription className="text-xs">Formula kalkulasi peringkat otomatis sesuai pedoman SNPMB Kemendikbud.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-slate-700">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 block font-semibold">1. Komponen Rapor (Bobot 75%):</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Rata-rata seluruh mata pelajaran dari semester 1 hingga semester 5 untuk jurusan MIPA dan IPS.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <strong className="text-slate-900 block font-semibold">2. Komponen Prestasi Lomba (Bobot 25%):</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Juara 1 Nasional (10 Pts), Juara 2-3 Nasional (8.5 Pts), Juara Provinsi (6 Pts), Juara Kota (4 Pts).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
