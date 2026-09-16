import React from "react";
import Link from "next/link";
import { ClipboardCheck, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AsesmenPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Asesmen Minat, Bakat & Karir</h1>
          <p className="text-sm text-slate-500">Hasil tes psikologi, pemetaan jurusan PTN, dan kesiapan karir murid.</p>
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
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">Pemetaan Jurusan & Asesmen Terjadwal</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Asesmen berkala dilakukan oleh Guru BK SMAN 8 untuk memandu siswa memilih program studi dan beasiswa yang sesuai dengan profil akademiknya.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
