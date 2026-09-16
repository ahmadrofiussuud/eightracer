"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Award,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  School,
  History,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { MetricCard } from "@/components/analytics/MetricCard";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockStatsOverview, mockAlumniList } from "@/data/mockData";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-gradient-to-bl from-emerald-500/20 via-indigo-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200">
            <School className="w-3.5 h-3.5" />
            <span>Pusat Kendali Admin Sekolah SMAN 8 Jakarta</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Selamat Datang di Portal Eightracer
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Ringkasan menyeluruh data peserta didik aktif, pemeringkatan kuota eligibilitas SNBP, hingga rekam jejak beasiswa alumni di perguruan tinggi negeri.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/admin/alumni-beasiswa/analitik">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-bold text-xs h-9 shadow-md">
                <BarChart3 className="w-4 h-4" />
                <span>Buka Analitik Beasiswa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/admin/alumni-beasiswa/timeline">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs h-9 font-semibold">
                <History className="w-4 h-4 mr-1.5" />
                <span>Timeline Individu</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Aggregate KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Total Siswa Aktif"
          value="1,248"
          subtitle="Kelas X, XI, & XII Dapodik"
          changePercent="100% Terdata"
          trend="neutral"
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="indigo"
        />

        <MetricCard
          title="Siswa Eligible SNBP"
          value="120 Siswa"
          subtitle="40% Kuota Akreditasi A"
          changePercent="72 MIPA • 48 IPS"
          trend="up"
          icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="amber"
        />

        <MetricCard
          title="Alumni di Perguruan Tinggi"
          value={mockStatsOverview.totalAlumni.toLocaleString("id-ID")}
          subtitle="Angkatan 2020 - 2024"
          changePercent="+86.4% Lolos PTN"
          trend="up"
          icon={<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="emerald"
        />

        <MetricCard
          title="Penerima KIP-Kuliah"
          value={`${mockStatsOverview.kipkPercentage}%`}
          subtitle={`${mockStatsOverview.kipkRecipients} mahasiswa penerima`}
          changePercent="Rata-rata IPK 3.63"
          trend="up"
          icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="violet"
        />
      </div>

      {/* Quick Access Grid to Key PRD Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:border-indigo-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Data Murid & Ekonomi</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </CardTitle>
            <CardDescription className="text-xs">
              Input dan kelola biodata murid, latar belakang ekonomi prasejahtera, dan asesmen psikotes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Link href="/admin/murid/biodata">
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs text-indigo-600 font-semibold hover:bg-indigo-50">
                <span>Kelola Data Murid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-indigo-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Penentuan Eligibilitas</span>
              <Award className="w-4 h-4 text-amber-600" />
            </CardTitle>
            <CardDescription className="text-xs">
              Input nilai rapor semester 1-5, sertifikat prestasi kejuaraan, dan pemeringkatan kuota 40%.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Link href="/admin/eligibilitas/status">
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs text-indigo-600 font-semibold hover:bg-indigo-50">
                <span>Cek Peringkat Kuota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-indigo-300 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Study Tracer Alumni</span>
              <GraduationCap className="w-4 h-4 text-emerald-600" />
            </CardTitle>
            <CardDescription className="text-xs">
              Input dan lacak progres mahasiswa di PT, status beasiswa KIP-K, dan pembiayaan UKT.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Link href="/admin/tracer/list">
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs text-indigo-600 font-semibold hover:bg-indigo-50">
                <span>Lihat List Alumni</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alumni Snapshot */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Sorotan Alumni Terkini di PTN
              </CardTitle>
              <CardDescription className="text-xs">
                Akses cepat menuju Linimasa Individu dan evaluasi beasiswa mahasiswa.
              </CardDescription>
            </div>
            <Link href="/admin/alumni-beasiswa/timeline">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Lihat Semua
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {mockAlumniList.slice(0, 4).map((alumni) => (
              <div key={alumni.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {alumni.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      {alumni.fullName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {alumni.university} • {alumni.major} (Angk. {alumni.graduationYear})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <Badge variant={alumni.scholarshipStatus === "KIP-Kuliah" ? "kipk" : "outline"} className="text-[10px]">
                    {alumni.scholarshipStatus}
                  </Badge>
                  <span className="text-xs font-bold text-slate-800">
                    IPK: {alumni.cumulativeGpa.toFixed(2)}
                  </span>
                  <Link href="/admin/alumni-beasiswa/timeline">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-indigo-600 font-semibold">
                      Linimasa
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
