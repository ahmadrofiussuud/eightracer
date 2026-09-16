"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Compass,
  Award,
  GraduationCap,
  TrendingUp,
  LogOut,
  School,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const studentNavItems = [
  {
    name: "Beranda",
    href: "/student",
    icon: LayoutDashboard,
  },
  {
    name: "Kelola Profil",
    href: "/student/profil",
    icon: UserCheck,
  },
  {
    name: "Asesmen Karakteristik",
    href: "/student/asesmen",
    icon: Compass,
    badge: "Riwayat",
  },
  {
    name: "Eligibilitas",
    href: "/student/eligibilitas",
    icon: Award,
    badge: "Cek Status",
  },
  {
    name: "Study Tracer",
    href: "/student/tracer",
    icon: GraduationCap,
    badge: "Alumni",
  },
  {
    name: "Track Alumni di PT",
    href: "/student/alumni-pt",
    icon: TrendingUp,
    badge: "Progress",
  },
];

export function StudentSidebar({ isOpen, onClose }: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Student Sidebar Container */}
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
              href="/student" 
              className="flex items-center gap-3 group"
              onClick={onClose}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-100 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    Eight<span className="text-emerald-600">racer</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Siswa
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Portal Siswa SMAN 8 Jakarta
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

          {/* Student Status Card */}
          <div className="m-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50/80 via-slate-50 to-indigo-50/50 border border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">Status SNBP</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">
                Eligible Kuota 40%
              </span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-bold text-emerald-700 shadow-2xs">
                Peringkat 4
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-3 flex-1">
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Siswa
            </p>
            <nav className="space-y-1">
              {studentNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-emerald-600"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xs">
                AF
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  Ahmad Fauzan R.
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  XII MIPA 1 • NISN: 0058291044
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="flex items-center gap-2.5 w-full px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
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
