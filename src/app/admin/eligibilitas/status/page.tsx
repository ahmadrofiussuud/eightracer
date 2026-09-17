"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Award, Download, Sparkles, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockEligibilityList } from "@/data/mockData";
import { exportToCsv } from "@/lib/export";

export default function KriteriaCekStatusPage() {
  const [selectedMajor, setSelectedMajor] = useState("ALL");

  const filtered = mockEligibilityList.filter((item) => {
    if (selectedMajor === "ALL") return true;
    return item.major === selectedMajor;
  });

  const handleExport = () => {
    exportToCsv(
      "SK_Kuota_Eligibilitas_SNBP_SMAN8",
      filtered,
      [
        { key: "rank", header: "Peringkat" },
        { key: "studentName", header: "Nama Siswa" },
        { key: "nisn", header: "NISN" },
        { key: "className", header: "Kelas" },
        { key: "reportScoreAvg", header: "Rapor Sem 1-5" },
        { key: "achievementPoints", header: "Poin Prestasi" },
        { key: "finalScore", header: "Skor Akhir" },
        { key: "quotaStatus", header: "Status Kuota" },
        { key: "targetMajorPilihan1", header: "Pilihan 1 PTN" },
      ]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kriteria & Cek Status Eligibilitas</h1>
          <p className="text-xs text-slate-500">Hasil kalkulasi pemeringkatan kuota 40% siswa terbaik untuk seleksi nasional SNBP 2025.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" className="h-8 text-xs gap-1.5 hover:bg-slate-100">
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor SK Kuota</span>
          </Button>
          <Link href="/admin/eligibilitas/input">
            <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700">
              <span>Input Data Pendukung</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Daftar Peringkat Kelayakan Kuota 40%</CardTitle>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
            >
              <option value="ALL">Semua Jurusan</option>
              <option value="MIPA">Jurusan MIPA</option>
              <option value="IPS">Jurusan IPS</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14 text-center">Rank</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Rapor Sem 1-5</TableHead>
                  <TableHead>Poin Prestasi</TableHead>
                  <TableHead>Skor Akhir</TableHead>
                  <TableHead>Status Kuota</TableHead>
                  <TableHead>Pilihan 1 PTN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.rank}>
                    <TableCell className="text-center font-bold text-xs">{s.rank}</TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">{s.studentName}</span>
                      <span className="text-[10px] text-slate-400">NISN: {s.nisn}</span>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{s.className}</Badge></TableCell>
                    <TableCell className="font-semibold text-xs text-slate-800">{s.reportScoreAvg.toFixed(1)}</TableCell>
                    <TableCell className="text-xs text-slate-600">+{s.achievementPoints.toFixed(1)}</TableCell>
                    <TableCell className="font-bold text-xs text-indigo-700">{s.finalScore.toFixed(1)}</TableCell>
                    <TableCell>
                      <Badge variant={s.quotaStatus.includes("Eligible") ? "success" : "warning"} className="text-[10px]">
                        {s.quotaStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">{s.targetMajorPilihan1}</TableCell>
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
