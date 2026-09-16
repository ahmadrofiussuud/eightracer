import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Award, 
  Calendar, 
  ChevronLeft, 
  Mail, 
  Phone, 
  FileText, 
  Sparkles,
  CheckCircle2,
  Share2
} from "lucide-react";
import { AlumniStudent } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StudentHeroProps {
  student: AlumniStudent;
}

export function StudentHero({ student }: StudentHeroProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative gradient aura */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-bl from-indigo-100/60 via-emerald-50/40 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Back button & Action buttons */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/dashboard/alumni"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Direktori Alumni</span>
        </Link>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Bagikan</span>
          </Button>
          <Button variant="default" size="sm" className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
            <FileText className="w-3.5 h-3.5" />
            <span>Ekspor Linimasa</span>
          </Button>
        </div>
      </div>

      {/* Profile Header Grid */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Student Avatar & Basic Info */}
        <div className="flex items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-lg shadow-indigo-100 border-4 border-white">
              {student.fullName.slice(0, 2).toUpperCase()}
            </div>
            {student.scholarshipStatus === "KIP-Kuliah" && (
              <span 
                title="Penerima Beasiswa KIP-Kuliah Aktif"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs"
              >
                <Award className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {student.fullName}
              </h1>
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {student.status}
              </Badge>
              {student.scholarshipStatus === "KIP-Kuliah" && (
                <Badge variant="kipk" className="gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  KIP-Kuliah Merdeka
                </Badge>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>NISN: <strong className="text-slate-700">{student.nisn}</strong></span>
              <span>•</span>
              <span>Angkatan: <strong className="text-slate-700">{student.graduationYear} ({student.highSchoolClass})</strong></span>
              <span>•</span>
              <span>Jalur: <strong className="text-indigo-600 font-bold">{student.admissionPath}</strong></span>
            </p>

            {/* University & Major info */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>{student.university}</span>
              </div>
              <span className="text-slate-300">/</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>{student.faculty} • {student.major}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats Pill Cards */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-8">
          {/* GPA (IPK) Card */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              IPK Kumulatif
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-indigo-950">
                {student.cumulativeGpa.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-indigo-400">/ 4.00</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5">
              Predikat: Cumlaude
            </span>
          </div>

          {/* Current Semester */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Semester Aktif
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Sem. {student.currentSemester}
            </div>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">
              Tingkat 3 (Sarjana S1)
            </span>
          </div>

          {/* UKT Tier & Subsidy */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Biaya Kuliah (UKT)
            </span>
            <div className="text-base sm:text-lg font-black text-emerald-950 mt-0.5 truncate">
              {student.uktTier}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold mt-0.5">
              Bantuan Biaya Hidup Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Advisor Notes Box */}
      {student.advisorNotes && (
        <div className="mt-6 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-amber-900">Catatan Guru BP/BK: </strong>
            {student.advisorNotes}
          </p>
        </div>
      )}
    </div>
  );
}
