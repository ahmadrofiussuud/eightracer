"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  School,
  Download,
  Plus,
  RotateCcw,
} from "lucide-react";
import { MetricCard } from "@/components/analytics/MetricCard";
import { KipkPieChart } from "@/components/analytics/KipkPieChart";
import { GpaBarChart } from "@/components/analytics/GpaBarChart";
import { UktDistributionChart } from "@/components/analytics/UktDistributionChart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getFilteredAlumniData } from "@/data/mockData";

function DashboardAlumniContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read angkatan from URL query or default to ALL
  const currentAngkatan = searchParams.get("angkatan") || "ALL";

  // Local filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScholarship, setSelectedScholarship] = useState<string>("ALL");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("ALL");

  // Dynamic calculation based on Angkatan
  const { alumni: batchAlumni, stats, kipkChart, gpaChart, uktChart } = useMemo(() => {
    return getFilteredAlumniData(currentAngkatan);
  }, [currentAngkatan]);

  // Update URL on Angkatan filter change
  const handleAngkatanChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (year === "ALL") {
      params.delete("angkatan");
    } else {
      params.set("angkatan", year);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedScholarship("ALL");
    setSelectedUniversity("ALL");
    router.push(pathname);
  };

  // Filtered alumni list for the table
  const filteredAlumni = useMemo(() => {
    return batchAlumni.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nisn.includes(searchTerm) ||
        student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesScholarship =
        selectedScholarship === "ALL" ||
        (selectedScholarship === "KIP-K" && student.scholarshipStatus === "KIP-Kuliah") ||
        (selectedScholarship === "NON-BEASISWA" && student.scholarshipStatus === "Non-Beasiswa") ||
        (selectedScholarship === "UNGGULAN" && student.scholarshipStatus.includes("Unggulan"));

      const matchesUniversity =
        selectedUniversity === "ALL" || student.university.includes(selectedUniversity);

      return matchesSearch && matchesScholarship && matchesUniversity;
    });
  }, [batchAlumni, searchTerm, selectedScholarship, selectedUniversity]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              <GraduationCap className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Pusat Analitik Beasiswa & Alumni
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Alumni & Beasiswa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitoring kelulusan PTN, penerima KIP-Kuliah, distribusi UKT, dan progres IPK alumni SMAN 8.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh Laporan</span>
          </Button>
          <Button size="sm" className="h-8 gap-1 text-xs bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Data</span>
          </Button>
        </div>
      </div>

      {/* Active Angkatan Filter Banner */}
      {currentAngkatan !== "ALL" && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-900">
          <div className="flex items-center gap-2">
            <span className="font-bold">Memfilter Data:</span>
            <Badge variant="default" className="text-xs bg-indigo-600">
              Angkatan {currentAngkatan}
            </Badge>
            <span className="text-slate-500 hidden sm:inline">
              ({stats.totalAlumni} alumni terdata pada angkatan ini)
            </span>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900 underline text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            Reset ke Semua
          </button>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Total Alumni"
          value={stats.totalAlumni.toLocaleString("id-ID")}
          subtitle={currentAngkatan === "ALL" ? "Angkatan 2021 - 2024" : `Lulusan Th. ${currentAngkatan}`}
          changePercent="+14.2%"
          trend="up"
          icon={<School className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="indigo"
        />

        <MetricCard
          title="Penerima KIP-Kuliah"
          value={`${stats.kipkPercentage}%`}
          subtitle={`${stats.kipkRecipients} mahasiswa penerima`}
          changePercent="+3.8% Thn ini"
          trend="up"
          icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="emerald"
        />

        <MetricCard
          title="Rata-rata IPK"
          value={stats.averageGpa.toFixed(2)}
          subtitle="Standar Target: 3.50"
          changePercent="+0.08 pts"
          trend="up"
          icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="violet"
        />

        <MetricCard
          title="Kelulusan Masuk PTN"
          value={`${stats.ptnAcceptanceRate}%`}
          subtitle="Dominasi SNBP & SNBT"
          changePercent="+5.1%"
          trend="up"
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="amber"
        />
      </div>

      {/* Flagship Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <KipkPieChart
          data={kipkChart}
          totalAlumni={stats.totalAlumni}
        />

        <GpaBarChart
          data={gpaChart}
          averageGpa={stats.averageGpa}
        />
      </div>

      {/* Tuition Fee (UKT) Distribution */}
      <UktDistributionChart data={uktChart} />

      {/* Alumni Directory Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
                Direktori Alumni & Pelacakan Perkuliahan
              </CardTitle>
              <CardDescription className="text-xs">
                Pilih alumni untuk membuka halaman Linimasa Interaktif per individu.
              </CardDescription>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Menampilkan <strong>{filteredAlumni.length}</strong> alumni
            </div>
          </div>

          {/* Table Filters Toolbar */}
          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, NISN, atau prodi..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Filter Angkatan Dropdown */}
            <div>
              <select
                value={currentAngkatan}
                onChange={(e) => handleAngkatanChange(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer font-medium"
              >
                <option value="ALL">Semua Angkatan</option>
                <option value="2024">Angkatan 2024</option>
                <option value="2023">Angkatan 2023</option>
                <option value="2022">Angkatan 2022</option>
                <option value="2021">Angkatan 2021</option>
              </select>
            </div>

            {/* Filter Scholarship Dropdown */}
            <div>
              <select
                value={selectedScholarship}
                onChange={(e) => setSelectedScholarship(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer font-medium"
              >
                <option value="ALL">Semua Status Beasiswa</option>
                <option value="KIP-K">Penerima KIP-Kuliah</option>
                <option value="NON-BEASISWA">Non-Beasiswa (Reguler)</option>
                <option value="UNGGULAN">Beasiswa Unggulan</option>
              </select>
            </div>

            {/* Filter University Dropdown */}
            <div>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer font-medium"
              >
                <option value="ALL">Semua Universitas</option>
                <option value="Universitas Indonesia">Univ. Indonesia (UI)</option>
                <option value="Institut Teknologi Bandung">ITB Bandung</option>
                <option value="Universitas Gadjah Mada">UGM Yogyakarta</option>
                <option value="Institut Teknologi Sepuluh Nopember">ITS Surabaya</option>
                <option value="Universitas Airlangga">UNAIR Surabaya</option>
                <option value="Universitas Diponegoro">UNDIP Semarang</option>
                <option value="Universitas Brawijaya">UB Malang</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Mahasiswa / Alumni</TableHead>
                  <TableHead className="min-w-[180px]">Universitas & Prodi</TableHead>
                  <TableHead>Jalur</TableHead>
                  <TableHead>Beasiswa</TableHead>
                  <TableHead>IPK</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlumni.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-slate-400 text-xs">
                      Tidak ada data alumni yang cocok dengan kriteria filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlumni.map((student) => (
                    <TableRow key={student.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {student.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <Link
                              href={`/dashboard/alumni/${student.id}`}
                              className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs sm:text-sm hover:underline block"
                            >
                              {student.fullName}
                            </Link>
                            <span className="text-[10px] text-slate-400">
                              NISN: {student.nisn} • Angk. {student.graduationYear}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-xs">
                          <span className="font-semibold text-slate-800 block">
                            {student.university}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            {student.major}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={student.admissionPath === "SNBP" ? "warning" : "secondary"}
                          className="text-[10px]"
                        >
                          {student.admissionPath}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {student.scholarshipStatus === "KIP-Kuliah" ? (
                          <Badge variant="kipk" className="gap-1 text-[10px]">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            KIP-K
                          </Badge>
                        ) : student.scholarshipStatus.includes("Unggulan") ? (
                          <Badge variant="warning" className="text-[10px]">
                            Unggulan
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-slate-600">
                            Reguler
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-slate-900">
                            {student.cumulativeGpa.toFixed(2)}
                          </span>
                          {student.cumulativeGpa >= 3.8 && (
                            <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              Cumlaude
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="text-xs text-slate-700 font-medium">
                          Sem. {student.currentSemester}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <Link href={`/dashboard/alumni/${student.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          >
                            <span>Linimasa</span>
                            <ChevronRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ScholarshipAnalyticsDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 animate-pulse">Memuat dashboard alumni...</div>}>
      <DashboardAlumniContent />
    </Suspense>
  );
}
