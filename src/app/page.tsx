"use client";

import React from "react";
import Link from "next/link";
import {
  School,
  Sparkles,
  ArrowRight,
  GraduationCap,
  History,
  BarChart3,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Public Navbar */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <School className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-white">
                  Eight<span className="text-indigo-400">racer</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SMAN 8
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Sistem Pelacakan Siswa & Alumni PTN
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#fitur" className="hover:text-white transition-colors">Fitur Unggulan</a>
            <a href="#timeline" className="hover:text-white transition-colors">Linimasa</a>
            <a href="#analitik" className="hover:text-white transition-colors">Analitik Beasiswa</a>
            <a href="#tentang" className="hover:text-white transition-colors">Tentang Sistem</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white text-xs sm:text-sm">
                Masuk (Login)
              </Button>
            </Link>
            <Link href="/admin/alumni-beasiswa/analitik">
              <Button className="bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/20 gap-1.5">
                <span>Eksplor Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-indigo-300 mb-8 backdrop-blur-md shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Platform Pemantauan Siswa SMA ke Perguruan Tinggi Terintegrasi</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.15]">
          Dari Bangku SMA Hingga Prestasi di{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">
            Perguruan Tinggi Negeri
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl leading-relaxed">
          <strong>Eightracer</strong> mencatat perjalanan akademik siswa SMAN 8 Jakarta secara menyeluruh: seleksi masuk PTN (SNBP & SNBT), pemeringkatan eligibilitas 40%, pembiayaan UKT, hingga progres capaian beasiswa KIP-Kuliah dan IPK universitas.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 gap-2">
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/admin/alumni-beasiswa/timeline" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold text-base gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <span>Lihat Demo Linimasa Siswa</span>
            </Button>
          </Link>
        </div>

        {/* Real-time statistics ticker */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-xs">
            <div className="text-3xl font-black text-white">1,248</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Siswa Terdata Aktif</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-xs">
            <div className="text-3xl font-black text-emerald-400">86.4%</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Lulus Seleksi PTN</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-xs">
            <div className="text-3xl font-black text-indigo-400">238</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Penerima KIP-Kuliah</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-xs">
            <div className="text-3xl font-black text-amber-400">3.63</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Rata-rata IPK Alumni</div>
          </div>
        </div>
      </section>

      {/* Flagship Features Section */}
      <section id="fitur" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="default" className="bg-indigo-600 text-white mb-3">
              Fitur Unggulan (Flagship)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dua Modul Inti Pemantauan Masa Depan Siswa
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Visualisasi modern yang memudahkan guru BK, kepala sekolah, dan orang tua memonitor keberlanjutan studi lulusan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature 1: Analitik Beasiswa */}
            <div id="analitik" className="rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Analitik Beasiswa & Evaluasi UKT
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Dashboard analitik interaktif menggunakan Recharts untuk memetakan penerima beasiswa KIP-Kuliah per tahun, korelasi nilai rapor SMA dengan IPK di perguruan tinggi, serta sebaran kelompok biaya kuliah (UKT) alumni.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sebaran KIP-Kuliah vs Non-Beasiswa per angkatan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Analisis korelasi nilai rapor terhadap kelulusan beasiswa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pengelompokan Uang Kuliah Tunggal (Golongan 1 - 8)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/60">
                <Link href="/admin/alumni-beasiswa/analitik">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white gap-2 font-semibold">
                    <span>Buka Dashboard Analitik Beasiswa</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature 2: Timeline Individu */}
            <div id="timeline" className="rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/80 p-8 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                  <History className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Timeline Individu (Linimasa)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Linimasa vertikal yang merangkum tonggak sejarah setiap siswa: sejak PPDB SMA, kejuaraan sains, pengumuman kelulusan SNBP, verifikasi KIP-K, Dean's List perkuliahan, hingga magang karir di dunia industri.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rekam jejak kronologis terpadu dari kelas X sampai lulus PTN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pemantauan IPK per semester dan bantuan biaya hidup KIP-K</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integrasi catatan komunikasi guru BK dan alumni</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/60">
                <Link href="/admin/alumni-beasiswa/timeline">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2 font-semibold">
                    <span>Lihat Linimasa Individu Alumni</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-extrabold text-white mb-10">
          Akses Sesuai Peran Pengguna
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Admin Sekolah */}
          <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                AD
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">Admin Sekolah & Guru BK</h4>
                <p className="text-xs text-slate-400">Hak Akses Penuh Kelola Data & Analitik</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Kelola biodata murid, asesmen minat bakat, simulasi kuota eligibilitas SNBP, tracer study lulusan, dan visualisasi agregat beasiswa alumni.
            </p>
            <Link href="/login">
              <Button variant="outline" className="w-full border-indigo-500/40 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs">
                Login sebagai Admin Sekolah
              </Button>
            </Link>
          </div>

          {/* Siswa */}
          <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                SW
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">Siswa & Calon Alumni</h4>
                <p className="text-xs text-slate-400">Portal Mandiri Siswa SMAN 8</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Cek status eligibilitas SNBP mandiri, lihat riwayat asesmen karir, pelajari sebaran alumni di berbagai PTN, dan pantau progres studi.
            </p>
            <Link href="/login">
              <Button variant="outline" className="w-full border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs">
                Login sebagai Siswa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 bg-slate-950 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Eightracer - SMAN 8 Jakarta. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300">Masuk Portal</Link>
            <Link href="/admin/alumni-beasiswa/analitik" className="hover:text-slate-300">Analitik Beasiswa</Link>
            <Link href="/admin/alumni-beasiswa/timeline" className="hover:text-slate-300">Linimasa Individu</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
