"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowLeft, ShieldCheck, Key, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EightracerLogo } from "@/components/ui/EightracerLogo";

interface FAQItem {
  id: string;
  category: "Akun" | "Fitur" | "Privasi & Keamanan";
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
    answer: "Akun Admin Sekolah bersifat tunggal dan tidak dibuat melalui pendaftaran umum. Kredensial Admin disediakan secara khusus oleh pengelola sistem/sekolah demi menjaga keamanan data sensitif seluruh murid."
  },
  {
    id: "3",
    category: "Akun",
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
    question: "Bagaimana status Eligibilitas SNBP dihitung?",
    answer: "Eligibilitas dihitung secara otomatis berdasarkan pemeringkatan 40% siswa terbaik (Akreditasi A). Kalkulasi menggabungkan bobot nilai rapor semester 1-5 (75%) dan poin portofolio prestasi lomba (25%)."
  },
  {
    id: "6",
    category: "Privasi & Keamanan",
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <EightracerLogo size={32} withBackground />
            <span className="font-black text-lg tracking-tight text-slate-900">
              Eight<span className="text-indigo-600">racer</span> FAQ
            </span>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              Masuk ke Portal
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Bantuan & Pertanyaan Umum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ada yang bisa kami bantu?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Temukan jawaban lengkap seputar alur pendaftaran, akses akun admin, fitur eligibilitas, dan keamanan data.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan atau kata kunci..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          {["ALL", "Akun", "Fitur", "Privasi & Keamanan"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat === "ALL" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <Card className="p-8 text-center text-slate-400 text-xs">
              Tidak ada pertanyaan yang sesuai dengan pencarian.
            </Card>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <Card key={faq.id} className="border-slate-200 shadow-xs overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-600">
                        {faq.category}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <CardContent className="pt-0 pb-4 px-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p className="pt-3">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Contact CTA */}
        <Card className="p-6 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white text-center space-y-3 rounded-2xl shadow-lg">
          <MessageCircle className="w-8 h-8 text-indigo-300 mx-auto" />
          <h3 className="font-bold text-base">Masih ada pertanyaan?</h3>
          <p className="text-xs text-indigo-200 max-w-sm mx-auto">
            Tim dukungan SMAN 8 Jakarta siap membantu kendala teknis atau pertanyaan seputar data alumni.
          </p>
          <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs">
            Hubungi Kami via WhatsApp
          </Button>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        © 2025 Eightracer SMAN 8 Jakarta. All rights reserved.
      </footer>
    </div>
  );
}
