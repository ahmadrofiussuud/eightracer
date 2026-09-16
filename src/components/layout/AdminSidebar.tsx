"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Wallet,
  Compass,
  Award,
  FileSpreadsheet,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  History,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
  School,
  X,
  FileCheck2,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  // Collapsible state for submenus
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dataMurid: true,
    eligibilitas: true,
    tracer: true,
    flagship: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Admin Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    Eight<span className="text-indigo-600">racer</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Portal Admin Sekolah SMAN 8
                </span>
              </div>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Section */}
          <div className="p-3 space-y-4 flex-1">
            {/* Top Single Links */}
            <div className="space-y-1">
              <Link
                href="/admin"
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                  pathname === "/admin"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Beranda</span>
              </Link>

              <Link
                href="/admin/profil"
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                  pathname === "/admin/profil"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <UserCheck className="w-4 h-4" />
                <span>Kelola Profil</span>
              </Link>
            </div>

            {/* Group 1: Data Murid */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection("dataMurid")}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700"
              >
                <span>Data Murid</span>
                {openSections.dataMurid ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {openSections.dataMurid && (
                <div className="space-y-0.5 pl-1">
                  <Link
                    href="/admin/murid/biodata"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/murid/biodata"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Biodata Murid</span>
                  </Link>

                  <Link
                    href="/admin/murid/ekonomi"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/murid/ekonomi"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Latar Belakang Ekonomi</span>
                  </Link>

                  <Link
                    href="/admin/murid/asesmen"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/murid/asesmen"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Asesmen Karakteristik</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Group 2: Penentuan Eligibilitas */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection("eligibilitas")}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700"
              >
                <span>Penentuan Eligibilitas</span>
                {openSections.eligibilitas ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {openSections.eligibilitas && (
                <div className="space-y-0.5 pl-1">
                  <Link
                    href="/admin/eligibilitas/input"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/eligibilitas/input"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Input Data Pendukung</span>
                  </Link>

                  <Link
                    href="/admin/eligibilitas/status"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/eligibilitas/status"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kriteria & Cek Status</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Group 3: Alumni ke PT / Study Tracer */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection("tracer")}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700"
              >
                <span>Alumni ke PT / Study Tracer</span>
                {openSections.tracer ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {openSections.tracer && (
                <div className="space-y-0.5 pl-1">
                  <Link
                    href="/admin/tracer/kelola"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/tracer/kelola"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Input & Kelola</span>
                  </Link>

                  <Link
                    href="/admin/tracer/list"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/tracer/list"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>List Alumni</span>
                  </Link>

                  <Link
                    href="/admin/tracer/progress-pt"
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      pathname === "/admin/tracer/progress-pt"
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Alumni di PT (KIP-K/IPK)</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Group 4: Alumni & Beasiswa (Flagship Feature) */}
            <div className="space-y-1 pt-1">
              <div className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100/60 mb-1.5">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Fitur Unggulan (Flagship)
                </span>
              </div>

              <div className="space-y-0.5 pl-1">
                <Link
                  href="/admin/alumni-beasiswa/timeline"
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                    pathname.startsWith("/admin/alumni-beasiswa/timeline")
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <History className="w-4 h-4" />
                    <span>Timeline Individu</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-100 font-bold">
                    Linimasa
                  </span>
                </Link>

                <Link
                  href="/admin/alumni-beasiswa/analitik"
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                    pathname.startsWith("/admin/alumni-beasiswa/analitik")
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analitik Beasiswa</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 font-bold">
                    Charts
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Link
              href="/login"
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
