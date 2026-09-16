"use client";

import React from "react";
import Link from "next/link";
import { ClipboardCheck, Sparkles, Compass, BookOpen, Brain, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAssessments } from "@/data/mockData";

export default function AsesmenPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Brain className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Psikotes & Pemetaan Karir
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Asesmen Minat, Bakat & Karir
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Hasil evaluasi psikologi siswa SMAN 8, tipe kepribadian Holland RIASEC, dan pemetaan fakultas perguruan tinggi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak Rekap Asesmen</span>
          </Button>
          <Link href="/dashboard/eligibilitas">
            <Button size="sm" className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
              <span>Cek Eligibilitas SNBP</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Assessment Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-indigo-50/60 to-white border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Tipe Karir Dominan</span>
              <h3 className="text-lg font-bold text-slate-900">Investigative (I) & Realistic (R)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            68% siswa MIPA memiliki kecocokan tinggi pada riset sains terapan, teknik, komputasi, dan kedokteran.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-emerald-50/60 to-white border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Tingkat Kesiapan PTN</span>
              <h3 className="text-lg font-bold text-slate-900">84.5% Sangat Siap</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Korelasi antara skor psikotes dengan pilihan program studi pilihan 1 SNBP menunjukkan konsistensi tinggi.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-50/60 to-white border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Gaya Belajar Mayoritas</span>
              <h3 className="text-lg font-bold text-slate-900">Visual & Kinestetik</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Metode drill soal UTBK dan praktikum laboratorium menjadi metode paling efektif bagi siswa angkatan ini.
          </p>
        </Card>
      </div>

      {/* Assessment Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-900">
            Hasil Pemetaan Minat & Rekomendasi Program Studi
          </CardTitle>
          <CardDescription className="text-xs">
            Digunakan oleh Guru BK untuk memvalidasi pilihan pendaftaran SNBP dan SNBT.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Siswa & Kelas</TableHead>
                  <TableHead className="min-w-[160px]">Kode RIASEC</TableHead>
                  <TableHead>Minat Utama</TableHead>
                  <TableHead className="min-w-[220px]">Rekomendasi Program Studi PTN</TableHead>
                  <TableHead>Gaya Belajar</TableHead>
                  <TableHead>Status Kesiapan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssessments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {item.studentName}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.className}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs font-semibold text-indigo-700 bg-indigo-50/50">
                        {item.riasecTopCode.slice(0, 3)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-slate-800">{item.primaryInterest}</span>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.recommendedMajors.map((major) => (
                          <span key={major} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {major}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-slate-600">{item.learningStyle}</span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={item.readinessCategory === "Sangat Siap PTN" ? "success" : "warning"}
                        className="text-[10px]"
                      >
                        {item.readinessCategory}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
