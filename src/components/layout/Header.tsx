"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Bell, Database, CheckCircle2, AlertCircle, Menu } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useSidebar } from "./SidebarContext";

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toggle } = useSidebar();

  const currentYear = searchParams.get("angkatan") || "ALL";

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (year === "ALL") {
      params.delete("angkatan");
    } else {
      params.set("angkatan", year);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between gap-2">
      {/* Left: Hamburger Menu (Mobile) & Search */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Buka navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative flex-1 max-w-xs sm:max-w-md">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari murid, alumni, PTN..."
            className="w-full pl-8 sm:pl-9 pr-3 sm:pr-8 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Angkatan Filter, Database Status & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Dynamic Angkatan Selector - Reactive to URL params */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-lg px-2 sm:px-2.5 py-1">
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium hidden xs:inline">
            Angkatan:
          </span>
          <select
            value={currentYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="text-[11px] sm:text-xs font-semibold text-slate-800 bg-transparent border-0 focus:ring-0 cursor-pointer p-0"
          >
            <option value="ALL">Semua Angkatan</option>
            <option value="2024">Angkatan 2024</option>
            <option value="2023">Angkatan 2023</option>
            <option value="2022">Angkatan 2022</option>
            <option value="2021">Angkatan 2021</option>
          </select>
        </div>

        {/* Supabase Status Pill (Desktop only to prevent clutter on mobile) */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium bg-slate-50 border-slate-200">
          <Database className="w-3.5 h-3.5 text-slate-500" />
          {isSupabaseConfigured ? (
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Live Supabase
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-700 font-semibold" title="Data dummy lokal aktif.">
              <AlertCircle className="w-3 h-3 text-amber-500" /> Fallback Mode
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
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
      <HeaderContent />
    </Suspense>
  );
}
