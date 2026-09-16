"use client";

import React from "react";
import { Search, Bell, Database, CheckCircle2, AlertCircle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left spacer for mobile hamburger */}
      <div className="flex items-center gap-4 lg:gap-6 pl-10 lg:pl-0">
        <div className="relative w-48 sm:w-72 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari siswa, NISN, universitas, atau beasiswa..."
            className="w-full pl-9 pr-12 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white px-1.5 py-0.5 border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Supabase Connection Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium bg-slate-50 border-slate-200">
          <Database className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-600">Database:</span>
          {isSupabaseConfigured ? (
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Live Supabase
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-700 font-semibold" title="Data dummy lokal aktif. Masukkan Supabase credentials di .env.local untuk sinkronisasi cloud.">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Fallback Mode
            </span>
          )}
        </div>

        {/* Notification Bell */}
        <button 
          title="Notifikasi"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        {/* Academic Year Chip */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-200">
          <span className="text-xs text-slate-500">Angkatan:</span>
          <select className="text-xs font-semibold text-slate-800 bg-transparent border-0 focus:ring-0 cursor-pointer">
            <option value="all">Semua Angkatan</option>
            <option value="2024">Angkatan 2024</option>
            <option value="2023">Angkatan 2023</option>
            <option value="2022">Angkatan 2022</option>
            <option value="2021">Angkatan 2021</option>
          </select>
        </div>
      </div>
    </header>
  );
}
