"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Search, Filter, GraduationCap, Download, Plus, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockActiveStudents } from "@/data/mockData";

export default function DataMuridPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("ALL");
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL");

  const filteredStudents = useMemo(() => {
    return mockActiveStudents.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nisn.includes(searchTerm) ||
        student.className.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade = selectedGrade === "ALL" || student.classGrade === selectedGrade;
      const matchesTrack = selectedTrack === "ALL" || student.ppdbTrack.includes(selectedTrack);

      return matchesSearch && matchesGrade && matchesTrack;
    });
  }, [searchTerm, selectedGrade, selectedTrack]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Users className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Database Siswa Aktif SMAN 8
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Data Murid Aktif
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manajemen profil peserta didik, rekam jejak nilai rapor, jalur afirmasi KIP, dan pemetaan bimbingan karir.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor Excel</span>
          </Button>
          <Link href="/dashboard/alumni">
            <Button size="sm" className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Lihat Data Alumni</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Siswa Aktif</span>
          <div className="text-2xl font-black text-slate-900 mt-1">1,248</div>
          <span className="text-[11px] text-emerald-600 font-medium">Terverifikasi Dapodik</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kelas XII (Calon Alumni)</span>
          <div className="text-2xl font-black text-indigo-600 mt-1">360</div>
          <span className="text-[11px] text-slate-500 font-medium">10 Rombel MIPA & IPS</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Afirmasi / KIP</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">78</div>
          <span className="text-[11px] text-emerald-700 font-medium">Prioritas KIP-Kuliah</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Bimbingan PTN Aktif</span>
          <div className="text-2xl font-black text-amber-600 mt-1">142</div>
          <span className="text-[11px] text-slate-500 font-medium">Konseling BK SMAN 8</span>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">Daftar Siswa Terdaftar</CardTitle>
              <CardDescription className="text-xs">
                Filter berdasarkan tingkat kelas dan jalur masuk PPDB.
              </CardDescription>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {filteredStudents.length} siswa
            </span>
          </div>

          {/* Filter Bar */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, NISN, atau kelas..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
            >
              <option value="ALL">Semua Jenjang Kelas</option>
              <option value="XII">Kelas XII (Tingkat Akhir)</option>
              <option value="XI">Kelas XI</option>
              <option value="X">Kelas X</option>
            </select>

            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
            >
              <option value="ALL">Semua Jalur PPDB</option>
              <option value="Prestasi">Jalur Prestasi</option>
              <option value="Afirmasi">Afirmasi (KIP)</option>
              <option value="Zonasi">Zonasi Reguler</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Nama Lengkap / NISN</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Jalur PPDB</TableHead>
                  <TableHead>Rata-rata Rapor</TableHead>
                  <TableHead>Status Ekonomi</TableHead>
                  <TableHead>Status Konselor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                          {student.fullName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          NISN: {student.nisn} • Gender: {student.gender}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {student.className}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-slate-700 font-medium">
                        {student.ppdbTrack}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-bold text-xs text-indigo-700">
                        {student.averageReportScore.toFixed(1)}
                      </span>
                    </TableCell>

                    <TableCell>
                      {student.economicStatus.includes("KIP") ? (
                        <Badge variant="kipk" className="text-[10px]">
                          Prasejahtera (KIP)
                        </Badge>
                      ) : (
                        <span className="text-xs text-slate-600">{student.economicStatus}</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          student.counselorStatus === "Siap SNBP"
                            ? "success"
                            : student.counselorStatus.includes("Butuh")
                            ? "warning"
                            : "outline"
                        }
                        className="text-[10px]"
                      >
                        {student.counselorStatus}
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
