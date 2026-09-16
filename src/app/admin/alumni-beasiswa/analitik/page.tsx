"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart3,
  Award,
  BookOpen,
  TrendingUp,
  Download,
  School,
  Wallet,
  Sparkles,
  Filter,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/analytics/MetricCard";

// Mock data: KIP-K Receivers Trend per Year
const mockYearlyKipkTrend = [
  { year: "2020", kipkCount: 28, nonBeasiswa: 242, total: 270, avgGpa: 3.52 },
  { year: "2021", kipkCount: 38, nonBeasiswa: 252, total: 290, avgGpa: 3.58 },
  { year: "2022", kipkCount: 52, nonBeasiswa: 268, total: 320, avgGpa: 3.65 },
  { year: "2023", kipkCount: 64, nonBeasiswa: 276, total: 340, avgGpa: 3.62 },
  { year: "2024", kipkCount: 76, nonBeasiswa: 284, total: 360, avgGpa: 3.68 },
];

// Correlation: High School Report Card (Rapor SMA) vs University Scholarship Award & IPK
const mockGradeCorrelationData = [
  { gradeRange: "80.0 - 84.9", kipkRecipients: 8, regularStudents: 62, avgCollegeIpk: 3.25 },
  { gradeRange: "85.0 - 87.9", kipkRecipients: 34, regularStudents: 140, avgCollegeIpk: 3.48 },
  { gradeRange: "88.0 - 90.9", kipkRecipients: 78, regularStudents: 290, avgCollegeIpk: 3.65 },
  { gradeRange: "91.0 - 93.9", kipkRecipients: 84, regularStudents: 260, avgCollegeIpk: 3.79 },
  { gradeRange: "94.0 - 100.0", kipkRecipients: 34, regularStudents: 122, avgCollegeIpk: 3.92 },
];

// UKT Distribution Data
const mockUktBreakdown = [
  { name: "Golongan 1 (Rp 500k / KIP-K)", nominal: "Rp 0 - Rp 500rb", count: 238, percent: 19.1, fill: "#10b981" },
  { name: "Golongan 2 (Rp 1.000.000)", nominal: "Rp 1.000.000", count: 112, percent: 9.0, fill: "#3b82f6" },
  { name: "Golongan 3 (Rp 2.5jt - 3.5jt)", nominal: "Rp 2.5jt - 3.5jt", count: 284, percent: 22.8, fill: "#6366f1" },
  { name: "Golongan 4 (Rp 4jt - 6jt)", nominal: "Rp 4jt - 6jt", count: 310, percent: 24.9, fill: "#8b5cf6" },
  { name: "Golongan 5 (Rp 7jt - 9jt)", nominal: "Rp 7jt - 9jt", count: 182, percent: 14.6, fill: "#f59e0b" },
  { name: "Golongan 6+ (> Rp 10jt)", nominal: "> Rp 10jt", count: 120, percent: 9.6, fill: "#ef4444" },
];

export default function AnalitikBeasiswaPage() {
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              <BarChart3 className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              Fitur Unggulan Tim • Flagship Feature
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Analitik Beasiswa & Distribusi UKT Alumni
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dashboard agregat pemantauan tren penerima KIP-Kuliah per tahun, korelasi nilai rapor SMA terhadap beasiswa, dan sebaran pembiayaan UKT.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Link href="/admin/alumni-beasiswa/timeline">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-slate-300">
              <span>Ke Timeline Individu</span>
            </Button>
          </Link>
          <Button size="sm" className="h-8 gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data PDDIKTI</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Total Penerima KIP-K"
          value="258 Siswa"
          subtitle="Peningkatan konsisten tiap tahun"
          changePercent="+18.8% YoY"
          trend="up"
          icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="emerald"
        />

        <MetricCard
          title="Total Subsidi UKT Tersalurkan"
          value="Rp 3.82 Miliar"
          subtitle="Alokasi Kemendikbudristek & PTN"
          changePercent="100% Terserap"
          trend="up"
          icon={<Wallet className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="indigo"
        />

        <MetricCard
          title="Retensi IPK > 3.50 KIP-K"
          value="88.2%"
          subtitle="Memenuhi syarat minimum beasiswa"
          changePercent="+4.5% pts"
          trend="up"
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="violet"
        />

        <MetricCard
          title="Kampus Penerima Terbanyak"
          value="Univ. Indonesia"
          subtitle="Diikuti ITB, UGM, & ITS"
          changePercent="84 Mahasiswa"
          trend="neutral"
          icon={<School className="w-5 h-5 sm:w-6 sm:h-6" />}
          accentColor="amber"
        />
      </div>

      {/* Visualization Grid 1: KIP-K Receivers Trend per Year */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Tren Pertumbuhan Penerima Beasiswa KIP-Kuliah (2020 - 2024)</span>
                <Badge variant="kipk" className="text-[10px]">
                  5 Tahun Terakhir
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                Perbandingan jumlah mahasiswa penerima KIP-K dibanding mahasiswa non-beasiswa reguler serta tren kenaikan rata-rata IPK.
              </CardDescription>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Sumber: PDDikti & SNPMB</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2 pb-6">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockYearlyKipkTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[3.0, 4.0]} tick={{ fontSize: 11, fill: "#10b981" }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700 min-w-[200px]">
                          <p className="font-bold text-sm text-indigo-300">Tahun Kelulusan {label}</p>
                          <div className="space-y-1 text-slate-300">
                            <div className="flex justify-between">
                              <span className="text-emerald-400">Penerima KIP-K:</span>
                              <span className="font-bold text-white">{payload[0]?.value} siswa</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-400">Reguler (Mandiri):</span>
                              <span className="font-bold text-white">{payload[1]?.value} siswa</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-800">
                              <span className="text-amber-400">Rata-rata IPK Kuliah:</span>
                              <span className="font-bold text-white">{payload[2]?.value} / 4.00</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val) => {
                    if (val === "kipkCount") return <span className="text-xs font-semibold text-slate-700">Penerima KIP-Kuliah</span>;
                    if (val === "nonBeasiswa") return <span className="text-xs font-semibold text-slate-700">Non-Beasiswa Reguler</span>;
                    if (val === "avgGpa") return <span className="text-xs font-semibold text-emerald-700">Rata-rata IPK Mahasiswa</span>;
                    return val;
                  }}
                />
                <Bar yAxisId="left" dataKey="kipkCount" name="kipkCount" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Bar yAxisId="left" dataKey="nonBeasiswa" name="nonBeasiswa" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Line yAxisId="right" type="monotone" dataKey="avgGpa" name="avgGpa" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Visualization Grid 2: Correlation Grades vs Scholarship + UKT Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart A: Correlation of High School Grades vs Scholarship Status */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-900">
              Korelasi Nilai Rapor SMA vs Status Beasiswa
            </CardTitle>
            <CardDescription className="text-xs">
              Menganalisis apakah nilai rapor SMA 8 berkorelasi dengan perolehan KIP-K dan IPK perguruan tinggi.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 pb-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockGradeCorrelationData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="gradeRange" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 border border-slate-700">
                            <p className="font-bold text-indigo-300">Rentang Rapor SMA: {label}</p>
                            <p className="text-emerald-400 font-semibold">Penerima KIP-K: {item.kipkRecipients} siswa</p>
                            <p className="text-slate-300">Siswa Reguler: {item.regularStudents} siswa</p>
                            <p className="text-amber-400 font-bold pt-1 border-t border-slate-800">
                              Rata-rata IPK Kuliah: {item.avgCollegeIpk}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    formatter={(val) => (val === "kipkRecipients" ? <span className="text-xs text-slate-700">Penerima KIP-K</span> : <span className="text-xs text-slate-700">Siswa Reguler</span>)}
                  />
                  <Bar dataKey="kipkRecipients" name="kipkRecipients" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={35} />
                  <Bar dataKey="regularStudents" name="regularStudents" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={35} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
              <span className="font-bold">Insight: </span>
              Siswa dengan rata-rata rapor SMA &gt; 88.0 memiliki peluang <strong>3.2x lebih besar</strong> lolos verifikasi KIP-Kuliah dan mempertahankan IPK &gt; 3.65 di universitas.
            </div>
          </CardContent>
        </Card>

        {/* Chart B: UKT Distribution */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-900">
              Distribusi Kelompok Biaya Kuliah (UKT)
            </CardTitle>
            <CardDescription className="text-xs">
              Sebaran penetapan nominal UKT per semester yang diterima alumni SMAN 8 di PTN.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 pb-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 border border-slate-700">
                            <p className="font-bold text-white flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.fill }} />
                              {item.name}
                            </p>
                            <p className="text-slate-300">Nominal: {item.nominal}</p>
                            <p className="text-slate-300">Jumlah Mahasiswa: <strong className="text-white">{item.count} siswa</strong></p>
                            <p className="text-emerald-400 font-bold">Persentase: {item.percent}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={mockUktBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {mockUktBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={40}
                    formatter={(value, entry: any) => (
                      <span className="text-[11px] font-medium text-slate-700">
                        {value} ({entry.payload.percent}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900">
              <span className="font-bold">Evaluasi Finansial: </span>
              <strong>41.9% alumni</strong> terbebas dari UKT tinggi berkat subsidi KIP-K (Golongan 1) dan Golongan 2 & 3.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
