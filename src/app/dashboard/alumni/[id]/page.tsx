"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { 
  mockAlumniList, 
  mockMilestones 
} from "@/data/mockData";
import { StudentHero } from "@/components/timeline/StudentHero";
import { TimelineNode } from "@/components/timeline/TimelineNode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Plus, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  MessageSquare,
  Clock,
  History
} from "lucide-react";
import { MilestoneCategory } from "@/types/student";

const categoryFilters: { label: string; value: string }[] = [
  { label: "Semua Linimasa", value: "ALL" },
  { label: "SMA & Prestasi", value: "SMA" },
  { label: "Seleksi PTN", value: "Seleksi Masuk" },
  { label: "Beasiswa KIP-K", value: "Beasiswa" },
  { label: "Akademik & IPK", value: "Akademik" },
  { label: "Magang & Karir", value: "Magang & Karir" },
];

export default function AlumniTimelinePage() {
  const params = useParams();
  const studentId = (params?.id as string) || "ALM-2022-001";

  // Find student by ID or fallback to the first student
  const student = useMemo(() => {
    return (
      mockAlumniList.find((s) => s.id === studentId) ||
      mockAlumniList[0]
    );
  }, [studentId]);

  // Retrieve student's milestones
  const allMilestones = useMemo(() => {
    return mockMilestones[student.id] || mockMilestones["ALM-2022-001"] || [];
  }, [student.id]);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredMilestones = useMemo(() => {
    if (selectedCategory === "ALL") return allMilestones;
    if (selectedCategory === "SMA") {
      return allMilestones.filter((m) => m.category === "SMA" || m.category === "Prestasi");
    }
    return allMilestones.filter((m) => m.category === selectedCategory);
  }, [allMilestones, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      {/* Student Profile Hero Header */}
      <StudentHero student={student} />

      {/* Main Grid: Left Timeline + Right Quick Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: The Vertical Linimasa */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline Filter Controls */}
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

          {/* Vertical Timeline Card Container */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xs p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-600" />
                  Linimasa Perjalanan Siswa
                </h2>
                <p className="text-xs text-slate-500">
                  Rekam jejak akademik sejak masuk SMAN 8 hingga progres perkuliahan semester {student.currentSemester}.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredMilestones.length} Tahapan
              </span>
            </div>

            {/* Timeline Vertical Stack */}
            <div className="pt-2">
              {filteredMilestones.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Tidak ada milestone pada kategori ini.
                </div>
              ) : (
                filteredMilestones.map((milestone, idx) => (
                  <TimelineNode
                    key={milestone.id}
                    milestone={milestone}
                    isLast={idx === filteredMilestones.length - 1}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Analytics & Scholarship Status Panel */}
        <div className="space-y-6">
          {/* GPA Progression Panel */}
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
                  <span className="text-slate-600 font-medium">Semester 4</span>
                  <span className="font-bold text-emerald-600">3.90</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "97.5%" }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">Semester 5 (MSIB Intern)</span>
                  <span className="font-bold text-slate-900">3.88</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: "97.0%" }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">SKS Terlampaui:</span>
                <span className="font-bold text-slate-800">112 SKS (Target 144)</span>
              </div>
            </CardContent>
          </Card>

          {/* Scholarship & UKT Monitoring Widget */}
          <Card className="border-emerald-200/80 bg-gradient-to-b from-emerald-50/30 to-white">
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
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Pembebasan UKT (100%)</span>
                  <span className="text-slate-500 text-[11px]">
                    Dibayarkan langsung oleh Kemendikbudristek ke {student.university}.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Bantuan Biaya Hidup Semester Genap</span>
                  <span className="text-slate-500 text-[11px]">
                    Status: Tersalurkan via Rekening BRI (Rp 8.400.000 / semester).
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[11px] text-slate-500 font-medium">Jadwal Evaluasi IPK Berikutnya:</span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Juli 2025 (Batas IPK Min: 3.00)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Quick Note Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                Komunikasi Guru BK / Wali Siswa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Dra. Hj. Nurul H.</span>
                  <span>14 Jan 2025</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Siswa telah berkonsultasi mengenai rencana studi lanjut magister fast-track atau peluang beasiswa LPDP. Sangat direkomendasikan untuk mentoring adik kelas di SMAN 8.
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full text-xs">
                Kirim Pengingat Evaluasi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
