"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Award,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  School,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "kipk";
}

const navItems: NavItem[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Data Murid",
    href: "/dashboard/murid",
    icon: Users,
    badge: "1,248",
    badgeVariant: "secondary",
  },
  {
    name: "Asesmen",
    href: "/dashboard/asesmen",
    icon: ClipboardCheck,
  },
  {
    name: "Eligibilitas",
    href: "/dashboard/eligibilitas",
    icon: Award,
    badge: "SNBP",
    badgeVariant: "warning",
  },
  {
    name: "Dashboard Alumni & Beasiswa",
    href: "/dashboard/alumni",
    icon: GraduationCap,
    badge: "KIP-K",
    badgeVariant: "kipk",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Logo & Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link 
              href="/dashboard/alumni" 
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    Eight<span className="text-indigo-600">racer</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    v2.4
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  SMAN 8 Student & Alumni Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* School Badge / Academic Year Banner */}
          <div className="mx-4 my-4 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/80 via-slate-50 to-emerald-50/50 border border-indigo-100/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-700">Tahun Ajaran Aktif</span>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100 shadow-xs">
                2024 / 2025
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
              Pemantauan berkelanjutan dari seleksi PTN hingga evaluasi beasiswa KIP-K.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="px-3 flex-1">
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-indigo-600"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                            isActive
                              ? "bg-white/20 text-white"
                              : item.badgeVariant === "kipk"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.badgeVariant === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {!isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Help & External Links */}
          <div className="p-4 mx-3 mb-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Portal Terintegrasi</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Sinkronisasi data otomatis dengan SNPMB Kemendikbud & Puslapdik KIP-K.
            </p>
          </div>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                NH
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  Dra. Hj. Nurul H.
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  Koordinator BP/BK SMAN 8
                </span>
              </div>
            </div>
            <button 
              title="Keluar" 
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
