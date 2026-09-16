"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  History,
  Sparkles,
  User,
  Building2,
  BookOpen,
  Award,
  Filter,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  School,
  Share2,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TimelineNode } from "@/components/timeline/TimelineNode";
import { StudentHero } from "@/components/timeline/StudentHero";
import { mockAlumniList, mockMilestones } from "@/data/mockData";

const categoryFilters = [
  { label: "Semua Linimasa", value: "ALL" },
  { label: "SMA & Prestasi", value: "SMA" },
  { label: "Seleksi PTN", value: "Seleksi Masuk" },
  { label: "Beasiswa KIP-K", value: "Beasiswa" },
  { label: "Akademik & IPK", value: "Akademik" },
  { label: "Magang & Karir", value: "Magang & Karir" },
];

export default function TimelineIndividuPage() {
  // Active selected student ID
  const [selectedStudentId, setSelectedStudentId] = useState<string>("ALM-2022-001");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Selected student object
  const currentStudent = useMemo(() => {
    return mockAlumniList.find((s) => s.id === selectedStudentId) || mockAlumniList[0];
  }, [selectedStudentId]);

  // Student milestones
  const studentMilestones = useMemo(() => {
    const raw = mockMilestones[currentStudent.id] || mockMilestones["ALM-2022-001"] || [];
    if (selectedCategory === "ALL") return raw;
    if (selectedCategory === "SMA") {
      return raw.filter((m) => m.category === "SMA" || m.category === "Prestasi");
    }
    return raw.filter((m) => m.category === selectedCategory);
  }, [currentStudent.id, selectedCategory]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header & Student Selector Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              <History className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Fitur Unggulan Tim • Flagship Feature
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Timeline Individu Alumni (Linimasa)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pelacakan visual vertikal perjalanan siswa dari pendaftaran SMA, prestasi lomba, seleksi PTN, hingga progres perkuliahan.
          </p>
        </div>

        {/* Quick Student Switcher Dropdown */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
          <User className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pilih Profil Siswa</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-transparent border-0 p-0 focus:ring-0 cursor-pointer"
            >
              {mockAlumniList.map((alumni) => (
                <option key={alumni.id} value={alumni.id}>
                  {alumni.fullName} - {alumni.university} ({alumni.scholarshipStatus})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Profile Hero Card */}
      <StudentHero student={currentStudent} />

      {/* Main Grid: Vertical Timeline + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: The Vertical Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 px-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              {categoryFilters.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <Button size="sm" className="h-8 gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 shrink-0 mx-2">
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Milestone</span>
            </Button>
          </div>

          {/* Vertical Linimasa Container */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xs p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-600" />
                  Linimasa Perjalanan Akademik
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rekam jejak sejak masuk SMAN 8 hingga semester {currentStudent.currentSemester} di {currentStudent.university}.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                {studentMilestones.length} Tahapan
              </span>
            </div>

            {/* Vertical Nodes Stack */}
            <div className="pt-2">
              {studentMilestones.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Tidak ada milestone pada kategori ini.
                </div>
              ) : (
                studentMilestones.map((milestone, idx) => (
                  <TimelineNode
                    key={milestone.id}
                    milestone={milestone}
                    isLast={idx === studentMilestones.length - 1}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Analytics & Scholarship Status */}
        <div className="space-y-6">
          {/* GPA Progression Widget */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Tren Prestasi Semester (IPS)
                </CardTitle>
                <Badge variant="success" className="text-[10px]">
                  Stabil Unggul
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Semester 1</span>
                  <span className="font-bold text-slate-900">3.82</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "95.5%" }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">Semester 2 (Dean's List)</span>
                  <span className="font-bold text-emerald-600">3.85</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96.2%" }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">Semester 3</span>
                  <span className="font-bold text-slate-900">3.86</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "96.5%" }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">Semester 4 (Asisten Dosen)</span>
                  <span className="font-bold text-emerald-600">3.90</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "97.5%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">SKS Terlampaui:</span>
                <span className="font-bold text-slate-800">112 SKS (Target 144)</span>
              </div>
            </CardContent>
          </Card>

          {/* KIP-K Subsidy Card */}
          <Card className="border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Status Pencairan KIP-Kuliah
                </CardTitle>
                <Badge variant="kipk" className="text-[10px]">
                  Aktif Bersyarat
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Pembebasan Biaya Kuliah 100%</span>
                  <span className="text-slate-500 text-[11px]">
                    Ditanggung Puslapdik Kemendikbudristek via {currentStudent.university}.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Biaya Hidup Bulanan</span>
                  <span className="text-slate-500 text-[11px]">
                    Rp 1.400.000 / bulan (Tersalurkan Semester Genap).
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Note */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                Catatan Guru BP/BK SMAN 8
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-700 block">Dra. Hj. Nurul Hidayati, M.Pd</span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {currentStudent.advisorNotes || "Siswa menunjukkan komitmen akademik sangat baik dan aktif dalam kegiatan kemahasiswaan."}
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full text-xs">
                Kirim Pesan Mentoring
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
