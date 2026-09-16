"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, GraduationCap, CheckCircle2, AlertCircle, Search, Download, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockEligibilityList } from "@/data/mockData";

export default function EligibilitasPage() {
  const [selectedMajor, setSelectedMajor] = useState<string>("ALL");

  const filteredList = mockEligibilityList.filter((item) => {
    if (selectedMajor === "ALL") return true;
    return item.major === selectedMajor;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100">
              <Award className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Seleksi Nasional Berdasarkan Prestasi
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Eligibilitas Kuota SNBP (40%)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pemeringkatan siswa eligible SMAN 8 Jakarta (Akreditasi A) berdasarkan nilai rapor semester 1-5 dan portofolio prestasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh SK Penetapan</span>
          </Button>
          <Link href="/dashboard/alumni">
            <Button size="sm" className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Dashboard Alumni</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Quota Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-4 bg-emerald-50/60 border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800">Kuota MIPA (40%)</span>
            <Badge variant="success" className="text-[10px]">72 Siswa</Badge>
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-2">72 / 180</div>
          <p className="text-[11px] text-emerald-700 mt-1">Siswa peringkat 1 s.d. 72 otomatis berhak mendaftar SNBP.</p>
        </Card>

        <Card className="p-4 bg-indigo-50/60 border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-800">Kuota IPS (40%)</span>
            <Badge variant="default" className="text-[10px] bg-indigo-600">48 Siswa</Badge>
          </div>
          <div className="text-2xl font-black text-indigo-950 mt-2">48 / 120</div>
          <p className="text-[11px] text-indigo-700 mt-1">Siswa peringkat 1 s.d. 48 otomatis berhak mendaftar SNBP.</p>
        </Card>

        <Card className="p-4 bg-amber-50/60 border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">Pendaftar KIP-Kuliah</span>
            <Badge variant="warning" className="text-[10px]">Prioritas</Badge>
          </div>
          <div className="text-2xl font-black text-amber-950 mt-2">24 Siswa</div>
          <p className="text-[11px] text-amber-700 mt-1">Verifikasi akun KIP-Kuliah sinkron dengan data SNPMB Kemendikbud.</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Peringkat Paralel Kelayakan SNBP Siswa
              </CardTitle>
              <CardDescription className="text-xs">
                Kombinasi bobot 75% nilai rapor semester 1-5 + 25% poin sertifikat kejuaraan resmi.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
              >
                <option value="ALL">Semua Jurusan</option>
                <option value="MIPA">Jurusan MIPA Saja</option>
                <option value="IPS">Jurusan IPS Saja</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead className="min-w-[180px]">Nama Siswa / NISN</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Rata-rata Rapor</TableHead>
                  <TableHead>Poin Sertifikat</TableHead>
                  <TableHead>Nilai Akhir</TableHead>
                  <TableHead>Status Kuota</TableHead>
                  <TableHead className="min-w-[200px]">Pilihan 1 PTN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredList.map((student) => (
                  <TableRow key={student.rank}>
                    <TableCell className="text-center font-bold text-xs sm:text-sm text-slate-700">
                      <span className={student.rank <= 3 ? "w-6 h-6 rounded-full bg-amber-100 text-amber-800 inline-flex items-center justify-center font-bold" : ""}>
                        {student.rank}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {student.studentName}
                          </span>
                          {student.kipkStatus && (
                            <span title="Pendaftar KIP-Kuliah" className="text-emerald-600">
                              <Sparkles className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">NISN: {student.nisn}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {student.className}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold text-xs text-slate-800">
                        {student.reportScoreAvg.toFixed(1)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-slate-600">
                        +{student.achievementPoints.toFixed(1)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-bold text-xs text-indigo-700">
                        {student.finalScore.toFixed(1)}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          student.quotaStatus.includes("Eligible")
                            ? "success"
                            : student.quotaStatus === "Cadangan"
                            ? "warning"
                            : "outline"
                        }
                        className="text-[10px]"
                      >
                        {student.quotaStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-slate-800 block truncate max-w-[220px]">
                        {student.targetMajorPilihan1}
                      </span>
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
