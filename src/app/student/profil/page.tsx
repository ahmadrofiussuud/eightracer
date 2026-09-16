"use client";

import React, { useState } from "react";
import { UserCheck, Save, CheckCircle2, School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
  const [phone, setPhone] = useState("+62 812-8901-2345");
  const [email, setEmail] = useState("ahmad.fauzan@student.sman8.sch.id");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kelola Profil Siswa</h1>
        <p className="text-xs text-slate-500">Perbarui kontak dan informasi akun mandiri peserta didik SMAN 8 Jakarta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Biodata Resmi</CardTitle>
          <CardDescription className="text-xs">Data identitas utama terhubung dengan Dapodik sekolah.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            {saved && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Kontak profil berhasil diperbarui!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap</label>
                <input type="text" value="Ahmad Fauzan Rifqi" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-medium" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">NISN</label>
                <input type="text" value="0058291044" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-mono" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Kelas</label>
                <input type="text" value="XII MIPA 1" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-medium" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Akun</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-700">Nomor Handphone / WhatsApp</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold">
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Profil</span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
