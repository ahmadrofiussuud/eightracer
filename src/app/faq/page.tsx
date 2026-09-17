"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowLeft, ShieldCheck, Key, GraduationCap, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EightracerLogo } from "@/components/ui/EightracerLogo";

interface FAQItem {
  id: string;
  category: "Akun" | "Fitur" | "Keamanan";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "Akun",
    question: "Bagaimana cara mendaftar akun Siswa?",
    answer: "Siswa dapat mendaftar mandiri melalui tombol 'Daftar' di halaman utama, menggunakan Form Email/NISN atau Login Instan via Google. Verifikasi NISN wajib diisi agar data otomatis terhubung dengan data kesiswaan SMAN 8 Jakarta.",
  },
  {
    id: "2",
    category: "Akun",
    question: "Bagaimana cara mendapatkan akun Admin Sekolah?",
    answer: "Akun Admin Sekolah bersifat tunggal dan disediakan secara khusus oleh pengelola sekolah (tidak melalui pendaftaran mandiri) demi menjaga privasi & keamanan data sensitif seluruh murid.",
  },
  {
    id: "3",
    category: "Keamanan",
    question: "Mengapa akun Admin Sekolah otomatis ter-logout dari perangkat lain?",
    answer: "Untuk menjaga keamanan data tingkat tinggi, Admin Sekolah menerapkan aturan 'Single Device Login'. Jika akun Admin dibuka di perangkat baru, sesi di perangkat sebelumnya otomatis diakhiri.",
  },
  {
    id: "4",
    category: "Fitur",
    question: "Apa itu fitur Timeline Individu Alumni?",
    answer: "Timeline Individu adalah fitur unggulan yang menampilkan visualisasi kronologis perjalanan siswa sejak bangku SMA, kelulusan, penerimaan PTN, hingga perkembangan IPK dan status KIP-Kuliah per semester di universitas.",
  },
  {
    id: "5",
    category: "Fitur",
    question: "Bagaimana status Eligibilitas 40% SNBP dihitung?",
    answer: "Eligibilitas dihitung secara otomatis berdasarkan pemeringkatan 40% siswa terbaik (Akreditasi A). Kalkulasi menggabungkan bobot nilai rapor semester 1-5 (75%) dan poin portofolio prestasi lomba (25%).",
  },
  {
    id: "6",
    category: "Keamanan",
    question: "Apakah data pribadi siswa aman di Eightracer?",
    answer: "Ya, seluruh data dilindungi dengan kontrol akses berbasis peran (RBAC). Data finansial dan kontak pribadi alumni disembunyikan dari publik/siswa lain dan hanya dapat diakses oleh Admin Sekolah.",
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [openId, setOpenId] = useState<string | null>("1");

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col overflow-x-hidden">
      {/* Header Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <EightracerLogo size={36} withBackground />
            <div className="flex flex-col leading-tight">
              <span className="font-black text-lg tracking-tight text-slate-900">
                Eight<span className="text-indigo-600">racer</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">SMAN 8 Jakarta</span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link href="/">
              <Button variant="outline" size="sm" className="text-xs border-2 border-slate-900 font-bold gap-1.5 h-9 rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <ArrowLeft className="w-3.5 h-3.5" /> Kembali
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 px-4 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero FAQ Section */}
      <section className="relative bg-gradient-to-b from-amber-50 via-indigo-50/40 to-white pt-12 pb-16 overflow-hidden">
        {/* Playful Floating Shapes */}
        <div className="absolute top-4 left-6 w-14 h-14 rounded-full bg-yellow-400 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] animate-bounce pointer-events-none" style={{ animationDuration: "3.5s" }} />
        <div className="absolute top-2 right-12 w-16 h-28 rounded-2xl bg-indigo-500 border-2 border-slate-900 rotate-12 opacity-20 pointer-events-none" />
        <div className="absolute bottom-4 right-6 w-16 h-16 rounded-full bg-pink-400 border-2 border-slate-900 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-black text-slate-900 bg-yellow-400 border-2 border-slate-900 rounded-full px-4 py-1.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -rotate-1">
            <HelpCircle className="w-4 h-4 text-indigo-900" /> Pusat Bantuan & FAQ 💡
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Punya Pertanyaan? <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent font-black">
              Kami Siap Jawab! 🚀
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md mx-auto">
            Temukan jawaban lengkap seputar pendaftaran siswa, akun admin sekolah, eligibilitas, dan keamanan data.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan atau kata kunci..."
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-bold bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Main Accordion Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { id: "ALL", label: "✨ Semua Pertanyaan" },
            { id: "Akun", label: "🔐 Akun & Login" },
            { id: "Fitur", label: "⚡ Fitur Unggulan" },
            { id: "Keamanan", label: "🛡️ Keamanan Data" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition-all duration-150 cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-yellow-400 text-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] -translate-y-0.5 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordion Cards */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs font-bold bg-slate-50 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              Tidak ada pertanyaan yang cocok dengan pencarian Anda.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border-2 border-slate-900 transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] rotate-[-0.5deg]"
                      : "bg-white hover:bg-slate-50/80 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.15)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 text-[11px] font-black rounded-lg border border-slate-900 bg-indigo-100 text-indigo-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl border-2 border-slate-900 flex items-center justify-center font-black transition-transform ${isOpen ? "bg-yellow-400 text-slate-900 rotate-180 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]" : "bg-slate-100 text-slate-700"}`}>
                      <ChevronDown className="w-4 h-4 stroke-[3]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t-2 border-slate-900 bg-indigo-50/40 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Fun Contact Banner */}
        <div className="p-8 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white text-center space-y-4 rounded-3xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-900 flex items-center justify-center mx-auto font-black text-xl shadow-md rotate-3 border-2 border-slate-900">
            💬
          </div>
          <h3 className="font-black text-xl">Masih belum menemukan jawaban?</h3>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-md mx-auto">
            Tim BP/BK dan Admin SMAN 8 Jakarta siap membantu pertanyaan teknis atau verifikasi akun kamu!
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs h-10 px-6 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] gap-2">
            Hubungi Tim BP/BK Sekolah
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <EightracerLogo size={24} withBackground />
            <span className="font-bold text-slate-800">Eightracer</span>
            <span>·</span>
            <span>SMAN 8 Jakarta</span>
          </div>
          <span>© 2025 Eightracer. Sistem Pelacakan Siswa & Alumni.</span>
        </div>
      </footer>
    </div>
  );
}
