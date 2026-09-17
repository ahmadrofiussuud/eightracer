"use client";
// v2 — fun redesign: bold shapes, tilted cards, fixed buttons

import React from "react";
import Link from "next/link";
import {

  ArrowRight,
  GraduationCap,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  Award,
  ShieldCheck,
  LineChart,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EightracerLogo } from "@/components/ui/EightracerLogo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <EightracerLogo size={36} withBackground />
            <div className="flex flex-col leading-tight">
              <span className="font-black text-lg tracking-tight text-slate-900">
                Eight<span className="text-indigo-600">racer</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">SMAN 8 Jakarta</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-500">
            <a href="#fitur" className="hover:text-slate-900 transition-colors">Fitur</a>
            <a href="#statistik" className="hover:text-slate-900 transition-colors">Statistik</a>
            <a href="#tentang" className="hover:text-slate-900 transition-colors">Tentang</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/login">
              <Button variant="outline" className="text-sm border-slate-200 text-slate-700 hover:bg-slate-50 h-9 px-4">
                Masuk
              </Button>
            </Link>
            <Link href="/admin/alumni-beasiswa/analitik">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm h-9 px-4 gap-1.5">
                Eksplor Demo <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-white pt-16 pb-0 overflow-hidden">
        {/* Decorative shapes — bigger & bolder */}
        <div className="absolute top-6 left-4 w-16 h-16 rounded-full bg-yellow-400 shadow-lg pointer-events-none animate-bounce" style={{animationDuration:'3s'}} />
        <div className="absolute top-2 right-8 w-12 h-28 rounded-2xl bg-indigo-600 rotate-12 pointer-events-none" />
        <div className="absolute top-32 right-2 w-8 h-8 rounded-full bg-yellow-300 pointer-events-none" />
        <div className="absolute bottom-16 right-6 w-24 h-24 rounded-full border-[6px] border-indigo-300 pointer-events-none" />
        <div className="absolute bottom-4 left-8 w-20 h-20 rounded-2xl bg-emerald-400 opacity-40 -rotate-12 pointer-events-none" />
        <div className="absolute top-1/2 left-2 w-6 h-6 rounded-full bg-rose-400 opacity-60 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Platform Tracking Siswa & Alumni PTN
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
            Pantau{" "}
            <span className="font-cherry font-normal text-indigo-600 text-[2.8rem] md:text-[3.5rem]">Perjalanan</span>{" "}
            Siswa<br />
            dari{" "}
            <span className="font-cherry font-normal text-indigo-600 text-[2.8rem] md:text-[3.5rem]">SMA</span>{" "}
            ke{" "}
            <span className="relative inline-block">
              <span className="font-cherry font-normal text-indigo-600 text-[2.8rem] md:text-[3.5rem]">PTN</span>
              <span className="absolute -bottom-1 left-0 w-full h-2.5 bg-yellow-300 -z-10 rounded-sm" />
            </span>
          </h1>

          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Eightracer membantu SMAN 8 Jakarta melacak data siswa dari bangku SMA
            hingga progres perkuliahan alumni — lengkap dengan analitik beasiswa KIP-Kuliah.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link href="/login">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8 text-sm font-bold gap-2 rounded-xl shadow">
                Masuk ke Portal <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin/alumni-beasiswa/analitik">
              <Button variant="outline" className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 h-12 px-8 text-sm font-bold gap-2 rounded-xl">
                <BarChart3 className="w-4 h-4" /> Lihat Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto max-w-4xl">
            {/* Floating badges */}
            <div className="absolute -left-8 top-12 bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg rotate-[-6deg] z-10 hidden md:block">📈 IPK Naik!</div>
            <div className="absolute -right-6 top-8 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg rotate-[5deg] z-10 hidden md:block">✅ KIP-K Verified</div>
            <div className="absolute -right-4 bottom-12 bg-indigo-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg rotate-[-4deg] z-10 hidden md:block">🎓 248 Alumni</div>

            <div className="rounded-2xl border-2 border-slate-200 shadow-2xl overflow-hidden bg-slate-100">
              {/* Fake browser bar */}
              <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400 bg-slate-700 rounded px-3 py-0.5">eightracer.vercel.app/admin/analitik</span>
              </div>
              {/* Mini dashboard preview */}
              <div className="bg-white p-4">
                <div className="flex gap-3">
                  {/* Sidebar mini */}
                  <div className="w-36 shrink-0 bg-slate-50 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-lg bg-indigo-600" />
                      <div className="h-3 bg-indigo-200 rounded w-16" />
                    </div>
                    {["w-full bg-indigo-100","w-3/4 bg-slate-200","w-4/5 bg-slate-200","w-2/3 bg-slate-200","w-full bg-indigo-500","w-3/4 bg-slate-200"].map((c,i)=>(
                      <div key={i} className={`h-3.5 rounded-lg ${c}`} />
                    ))}
                  </div>
                  {/* Content mini */}
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        {bg:"bg-indigo-50",bar:"bg-indigo-400",val:"248"},
                        {bg:"bg-emerald-50",bar:"bg-emerald-400",val:"89"},
                        {bg:"bg-amber-50",bar:"bg-amber-400",val:"3.72"},
                        {bg:"bg-violet-50",bar:"bg-violet-400",val:"88%"},
                      ].map((c,i)=>(
                        <div key={i} className={`rounded-xl p-2.5 ${c.bg}`}>
                          <div className={`h-1.5 ${c.bar} rounded-full w-full mb-2 opacity-40`} />
                          <div className={`text-sm font-black ${c.bar.replace('bg-','text-').replace('-400','-700')}`}>{c.val}</div>
                          <div className="h-2 bg-slate-200 rounded w-3/4 mt-1" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 h-24 flex items-end gap-1 px-3">
                        {[40,65,50,80,60,90,70,55].map((h,i)=>(
                          <div key={i} className={`flex-1 rounded-t ${i===5?'bg-indigo-600':'bg-indigo-300'}`} style={{height:`${h}%`}} />
                        ))}
                      </div>
                      <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 h-24 flex items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 rounded-full border-[10px] border-slate-200" />
                          <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-indigo-500 border-r-emerald-400 rotate-45" />
                          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                            <span className="text-[9px] font-black text-slate-700">50%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Shadow glow */}
            <div className="absolute -inset-4 bg-indigo-200/30 blur-3xl -z-10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section id="statistik" className="bg-indigo-600 py-10 mt-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: "248+", label: "Alumni Terdaftar" },
            { value: "89", label: "Penerima KIP-Kuliah" },
            { value: "3.72", label: "Rata-rata IPK" },
            { value: "34", label: "PTN Mitra" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-yellow-300">{s.value}</div>
              <div className="text-indigo-200 text-sm mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FITUR ── */}
      <section id="fitur" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Fitur Unggulan</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Semua yang kamu butuhkan<br />
              <span className="text-indigo-600">ada di sini</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ClipboardList, iconColor: "text-white", iconBg: "bg-indigo-600", card: "bg-indigo-600 text-white", textMuted: "text-indigo-200", emoji: "📋", title: "Biodata & Profil Murid", desc: "Kelola data lengkap siswa mulai dari biodata, latar belakang ekonomi, hingga status bantuan sosial (PIP/PKH)." },
              { icon: BookOpen, iconColor: "text-slate-900", iconBg: "bg-yellow-400", card: "bg-yellow-400 text-slate-900", textMuted: "text-yellow-800", emoji: "📚", title: "Asesmen Karakteristik", desc: "Rekam gaya belajar, tipe kepribadian DISC/MBTI, dan pemetaan RIASEC untuk bimbingan karir yang tepat." },
              { icon: ShieldCheck, iconColor: "text-white", iconBg: "bg-emerald-600", card: "bg-emerald-500 text-white", textMuted: "text-emerald-100", emoji: "✅", title: "Penentuan Eligibilitas", desc: "Hitung dan cek status kelayakan KIP-Kuliah otomatis berdasarkan nilai rapor, kehadiran, dan prestasi." },
              { icon: GraduationCap, iconColor: "text-white", iconBg: "bg-sky-500", card: "bg-sky-500 text-white", textMuted: "text-sky-100", emoji: "🎓", title: "Study Tracer Alumni", desc: "Lacak alumni yang masuk PTN — jalur masuk (SNBP/SNBT/Mandiri), universitas, dan program studi pilihan." },
              { icon: LineChart, iconColor: "text-white", iconBg: "bg-violet-700", card: "bg-violet-600 text-white", textMuted: "text-violet-200", emoji: "📈", title: "Linimasa Individual", desc: "Visualisasi perjalanan kronologis tiap alumni dari kelulusan SMA hingga pencapaian di perguruan tinggi." },
              { icon: BarChart3, iconColor: "text-white", iconBg: "bg-rose-600", card: "bg-slate-900 text-white", textMuted: "text-slate-400", emoji: "📊", title: "Analitik Beasiswa", desc: "Dashboard lengkap tren KIP-Kuliah per angkatan, distribusi IPK, dan sebaran UKT dengan grafik interaktif." },
            ].map((f, i) => (
              <div key={f.title} className={`rounded-3xl p-6 ${f.card} hover:scale-[1.03] hover:-rotate-1 transition-all duration-200 cursor-default relative overflow-hidden`}
                style={{transform: i%2===1 ? 'rotate(1deg)' : i%3===2 ? 'rotate(-0.5deg)' : 'none'}}>
                {/* bg decoration */}
                <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 pointer-events-none select-none">{f.emoji}</div>
                <div className={`w-11 h-11 rounded-2xl ${f.iconBg} flex items-center justify-center mb-4 shadow-md`}>
                  <f.icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="font-black text-base mb-2">{f.title}</h3>
                <p className={`text-sm leading-relaxed ${f.textMuted}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AKSES ROLE ── */}
      <section id="tentang" className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute bottom-0 left-0 w-40 h-20 rounded-tr-full bg-emerald-400 opacity-20 pointer-events-none" />
        <div className="absolute top-10 right-0 w-20 h-40 rounded-bl-full bg-yellow-400 opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Akses Berbasis Peran</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Dirancang untuk semua pengguna</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin card */}
            <div className="bg-indigo-600 rounded-3xl p-7 text-white relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-indigo-500 opacity-50" />
              <div className="absolute bottom-4 right-8 w-14 h-14 rounded-full bg-yellow-400 opacity-30" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-1">Admin Sekolah</h3>
                <p className="text-indigo-200 text-sm mb-5">Akses penuh ke seluruh fitur manajemen</p>
                <ul className="space-y-2.5 mb-6">
                  {["Kelola seluruh data murid & alumni","Input eligibilitas & nilai pendukung","Akses penuh dashboard analitik","Buat & kelola akun admin lain","Export laporan & data beasiswa"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow-300 hover:text-yellow-200 transition-colors">
                  Masuk sebagai Admin <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Student card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-emerald-100" />
              <div className="absolute bottom-4 right-8 w-14 h-14 rounded-full bg-yellow-300 opacity-40" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Siswa / Alumni</h3>
                <p className="text-slate-400 text-sm mb-5">Pantau progres dan data diri sendiri</p>
                <ul className="space-y-2.5 mb-6">
                  {["Lihat profil & riwayat asesmen sendiri","Cek status eligibilitas KIP-Kuliah","Akses direktori alumni & tracer study","Lihat timeline perjalanan karir","Pantau progres IPK alumni lain"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Masuk sebagai Siswa <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-yellow-400 opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border-4 border-indigo-500 opacity-20 translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Siap memulai?
          </h2>
          <p className="text-slate-400 mb-8">
            Masuk ke portal Eightracer dan pantau perjalanan siswa SMAN 8 Jakarta hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/login">
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold h-12 px-8 rounded-xl text-sm shadow-lg">
                Masuk ke Portal 🚀
              </Button>
            </Link>
            <Link href="/admin/alumni-beasiswa/analitik">
              <Button className="bg-white hover:bg-slate-100 text-slate-900 font-bold h-12 px-8 rounded-xl text-sm border-2 border-white/60 shadow">
                Lihat Demo →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <EightracerLogo size={24} withBackground />
            <span className="font-semibold text-slate-600">Eightracer</span>
            <span>·</span>
            <span>SMAN 8 Jakarta</span>
          </div>
          <span>© 2025 Eightracer. Sistem Pelacakan Siswa & Alumni.</span>
        </div>
      </footer>
    </div>
  );
}
