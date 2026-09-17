"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowLeft, ShieldCheck, Key, GraduationCap, MessageCircle } from "lucide-react";
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
    answer: "Siswa dapat mendaftar mandiri melalui tombol 'Daftar' di halaman utama, menggunakan Form Email/NISN atau Login Instan via Google. Verifikasi NISN wajib diisi agar data otomatis terhubung dengan data kesiswaan SMAN 8 Jakarta."
  },
  {
    id: "2",
    category: "Akun",
    question: "Bagaimana cara mendapatkan akun Admin Sekolah?",
    answer: "Akun Admin Sekolah bersifat tunggal dan disediakan secara khusus oleh pengelola sekolah (tidak melalui pendaftaran mandiri) demi menjaga privasi & keamanan data sensitif seluruh murid."
  },
  {
    id: "3",
    category: "Keamanan",
    question: "Mengapa akun Admin Sekolah otomatis ter-logout dari perangkat lain?",
    answer: "Untuk menjaga keamanan data tingkat tinggi, Admin Sekolah menerapkan aturan 'Single Device Login'. Jika akun Admin dibuka di perangkat baru, sesi di perangkat sebelumnya otomatis diakhiri."
  },
  {
    id: "4",
    category: "Fitur",
    question: "Apa itu fitur Timeline Individu Alumni?",
    answer: "Timeline Individu adalah fitur unggulan yang menampilkan visualisasi kronologis perjalanan siswa sejak bangku SMA, kelulusan, penerimaan PTN, hingga perkembangan IPK dan status KIP-Kuliah per semester di universitas."
  },
  {
    id: "5",
    category: "Fitur",
    question: "Bagaimana status Eligibilitas 40% SNBP dihitung?",
    answer: "Eligibilitas dihitung secara otomatis berdasarkan pemeringkatan 40% siswa terbaik (Akreditasi A). Kalkulasi menggabungkan bobot nilai rapor semester 1-5 (75%) dan poin portofolio prestasi lomba (25%)."
  },
  {
    id: "6",
    category: "Keamanan",
    question: "Apakah data pribadi siswa aman di Eightracer?",
    answer: "Ya, seluruh data dilindungi dengan kontrol akses berbasis peran (RBAC). Data finansial dan kontak pribadi alumni disembunyikan dari publik/siswa lain dan hanya dapat diakses oleh Admin Sekolah."
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
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
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
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="text-xs border-slate-200 gap-1.5 h-9">
                <ArrowLeft className="w-3.5 h-3.5" /> Kembali
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-9 px-4">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero FAQ Section with user's font-cherry font styling */}
      <section className="relative bg-white pt-12 pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-slate-900 text-xs font-black shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-slate-900" /> FAQ & Pusat Bantuan
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Punya Pertanyaan?<br />
            <span className="font-cherry font-normal text-indigo-600 text-3xl sm:text-4xl block mt-1">
              Kami Punya Jawabannya! 💡
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Temukan jawaban lengkap seputar alur pendaftaran, akun admin sekolah, eligibilitas, dan keamanan data.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan atau kata kunci..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Category Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {["ALL", "Akun", "Fitur", "Keamanan"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "ALL" ? "Semua Pertanyaan" : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-semibold bg-slate-50 rounded-2xl border border-slate-200">
              Tidak ada pertanyaan yang sesuai dengan pencarian.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isOpen
                      ? "border-indigo-300 shadow-md ring-1 ring-indigo-500/10"
                      : "border-slate-200/80 hover:border-indigo-200 shadow-xs hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-500"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Banner */}
        <div className="p-6 bg-slate-900 text-white text-center space-y-3 rounded-3xl shadow-lg relative overflow-hidden">
          <MessageCircle className="w-7 h-7 text-yellow-400 mx-auto" />
          <h3 className="font-bold text-base">Masih ada pertanyaan?</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tim BP/BK dan Admin SMAN 8 Jakarta siap membantu pertanyaan teknis atau verifikasi akun kamu.
          </p>
          <Button size="sm" className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-xs h-9 px-6 rounded-xl">
            Hubungi Tim BP/BK Sekolah
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-6">
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
