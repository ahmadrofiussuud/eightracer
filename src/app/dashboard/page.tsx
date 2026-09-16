import React from "react";
import Link from "next/link";
import { LayoutDashboard, ArrowRight, GraduationCap, Users, Award, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-8 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Pusat Kendali Eightracer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Selamat Datang di Portal Eightracer
          </h1>
          <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
            Sistem terintegrasi untuk melacak prestasi siswa SMAN 8 dari jenjang kelas X, asesmen minat bakat, kuota eligibilitas SNBP, hingga capaian beasiswa KIP-Kuliah di perguruan tinggi.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/dashboard/alumni">
              <Button variant="emerald" className="gap-2 font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Buka Dashboard Alumni & Beasiswa</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard/eligibilitas">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <span>Cek Eligibilitas SNBP</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
