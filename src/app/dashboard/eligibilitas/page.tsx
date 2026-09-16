import React from "react";
import Link from "next/link";
import { Award, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EligibilitasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Eligibilitas SNBP & Jalur Prestasi</h1>
          <p className="text-sm text-slate-500">Peringkat 40% siswa terbaik sekolah untuk seleksi nasional perguruan tinggi.</p>
        </div>
        <Link href="/dashboard/alumni">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Data Alumni & Beasiswa</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Simulasi Pemeringkatan SNBP SMAN 8</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Sistem eligibilitas Eightracer mengkalkulasi bobot nilai rapor semester 1-5 dan sertifikat prestasi untuk merekomendasikan siswa pada kuota SNBP nasional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
