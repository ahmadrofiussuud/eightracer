"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Sparkles,
  School,
  Download,
  Plus,
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
import { 
  mockAlumniList, 
  mockKipkChartData, 
  mockGpaChartData, 
  mockUktDistributionData,
  mockStatsOverview 
} from "@/data/mockData";
import { AlumniStudent } from "@/types/student";

export default function ScholarshipAnalyticsDashboard() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScholarship, setSelectedScholarship] = useState<string>("ALL");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("ALL");

  // Filtered alumni list
  const filteredAlumni = useMemo(() => {
    return mockAlumniList.filter((student) => {
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
  }, [searchTerm, selectedScholarship, selectedUniversity]);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Pusat Analitik Beasiswa & Alumni
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Alumni & Beasiswa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitoring kelulusan PTN, penerima KIP-Kuliah, distribusi UKT, dan progres IPK universitas alumni SMAN 8.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Laporan PDDIKTI</span>
          </Button>
          <Button size="sm" className="gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Data Alumni</span>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Alumni Terdata"
          value={mockStatsOverview.totalAlumni.toLocaleString("id-ID")}
          subtitle="Angkatan 2021 - 2024"
          changePercent="+14.2%"
          trend="up"
          icon={<School className="w-6 h-6" />}
          accentColor="indigo"
        />

        <MetricCard
          title="Penerima KIP-Kuliah"
          value={`${mockStatsOverview.kipkPercentage}%`}
          subtitle={`${mockStatsOverview.kipkRecipients} mahasiswa penerima`}
          changePercent="+3.8% Thn ini"
          trend="up"
          icon={<Award className="w-6 h-6" />}
          accentColor="emerald"
        />

        <MetricCard
          title="Rata-rata IPK Alumni"
          value={mockStatsOverview.averageGpa.toFixed(2)}
          subtitle="Target Standar Sekolah: 3.50"
          changePercent="+0.08 pts"
          trend="up"
          icon={<BookOpen className="w-6 h-6" />}
          accentColor="violet"
        />

        <MetricCard
          title="Kelulusan Masuk PTN"
          value={`${mockStatsOverview.ptnAcceptanceRate}%`}
          subtitle="Dominasi SNBP & SNBT"
          changePercent="+5.1%"
          trend="up"
          icon={<TrendingUp className="w-6 h-6" />}
          accentColor="amber"
        />
      </div>

      {/* Flagship Recharts Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: KIP-K vs Non-KIP-K Status (Pie / Donut) */}
        <KipkPieChart
          data={mockKipkChartData}
          totalAlumni={mockStatsOverview.totalAlumni}
        />

        {/* Chart 2: GPA (IPK) Distribution (Grouped Bar Chart) */}
        <GpaBarChart
          data={mockGpaChartData}
          averageGpa={mockStatsOverview.averageGpa}
        />
      </div>

      {/* Secondary Chart: Tuition Fee (UKT) Distribution */}
      <UktDistributionChart data={mockUktDistributionData} />

      {/* Alumni Directory Table Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Direktori Alumni & Pelacakan Perkuliahan
              </CardTitle>
              <CardDescription>
                Pilih alumni untuk membuka halaman Linimasa Interaktif per individu.
              </CardDescription>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Menampilkan <strong>{filteredAlumni.length}</strong> dari {mockAlumniList.length} alumni
            </div>
          </div>

          {/* Table Filters & Search Bar */}
          <div className="pt-3 flex flex-col md:flex-row items-center gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, NISN, atau prodi..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:ml-auto">
              {/* Scholarship Filter */}
              <select
                value={selectedScholarship}
                onChange={(e) => setSelectedScholarship(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="ALL">Semua Beasiswa</option>
                <option value="KIP-K">Penerima KIP-Kuliah</option>
                <option value="NON-BEASISWA">Non-Beasiswa</option>
                <option value="UNGGULAN">Beasiswa Unggulan</option>
              </select>

              {/* University Filter */}
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="ALL">Semua Perguruan Tinggi</option>
                <option value="Universitas Indonesia">Universitas Indonesia</option>
                <option value="Institut Teknologi Bandung">ITB</option>
                <option value="Universitas Gadjah Mada">UGM</option>
                <option value="Institut Teknologi Sepuluh Nopember">ITS</option>
                <option value="Universitas Airlangga">UNAIR</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Mahasiswa / Alumni</TableHead>
                  <TableHead>Universitas & Program Studi</TableHead>
                  <TableHead>Jalur Masuk</TableHead>
                  <TableHead>Status Beasiswa</TableHead>
                  <TableHead>IPK Terkini</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi Linimasa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlumni.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                      Tidak ada data alumni yang cocok dengan pencarian.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAlumni.map((student) => (
                    <TableRow key={student.id} className="group">
                      {/* Name & NISN */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {student.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <Link
                              href={`/dashboard/alumni/${student.id}`}
                              className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm hover:underline block"
                            >
                              {student.fullName}
                            </Link>
                            <span className="text-[11px] text-slate-400">
                              NISN: {student.nisn} • {student.highSchoolClass} ({student.graduationYear})
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* University & Major */}
                      <TableCell>
                        <div className="text-xs">
                          <span className="font-semibold text-slate-800 block">
                            {student.university}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            {student.major} ({student.faculty})
                          </span>
                        </div>
                      </TableCell>

                      {/* Admission Path */}
                      <TableCell>
                        <Badge
                          variant={student.admissionPath === "SNBP" ? "warning" : "secondary"}
                          className="text-[11px]"
                        >
                          {student.admissionPath}
                        </Badge>
                      </TableCell>

                      {/* Scholarship Status */}
                      <TableCell>
                        {student.scholarshipStatus === "KIP-Kuliah" ? (
                          <Badge variant="kipk" className="gap-1 text-[11px]">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            KIP-Kuliah
                          </Badge>
                        ) : student.scholarshipStatus.includes("Unggulan") ? (
                          <Badge variant="warning" className="text-[11px]">
                            {student.scholarshipStatus}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[11px] text-slate-600">
                            Reguler
                          </Badge>
                        )}
                      </TableCell>

                      {/* GPA (IPK) */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900">
                            {student.cumulativeGpa.toFixed(2)}
                          </span>
                          {student.cumulativeGpa >= 3.8 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              Cumlaude
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Sem. {student.currentSemester}
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Link href={`/dashboard/alumni/${student.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          >
                            <span>Linimasa</span>
                            <ChevronRight className="w-3.5 h-3.5" />
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
