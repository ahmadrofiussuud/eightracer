"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { Menu, Bell, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Student Sidebar */}
      <StudentSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Body */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Student Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Buka navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Portal Siswa & Calon Alumni
              </span>
              <Badge variant="success" className="text-[10px] hidden sm:inline-flex gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Akun Terverifikasi
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              title="Notifikasi" 
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs">
                AF
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-slate-800">Ahmad Fauzan</span>
                <span className="text-[10px] text-slate-400">XII MIPA 1</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
