import React from "react";
import Link from "next/link";
import { Users, ArrowLeft, Search, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataMuridPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Murid Aktif</h1>
          <p className="text-sm text-slate-500">Database profil siswa terdaftar kelas X, XI, dan XII SMAN 8 Jakarta.</p>
        </div>
        <Link href="/dashboard/alumni">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Data Alumni & Beasiswa</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pusat Data Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800">Modul Data Murid Terhubung</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              1,248 siswa aktif terdaftar dalam sistem Dapodik SMAN 8. Untuk analisis universitas dan pelacakan linimasa lulusan, silakan akses halaman Dashboard Alumni.
            </p>
            <Link href="/dashboard/alumni">
              <Button className="mt-2 text-xs">Menuju Dashboard Alumni</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
