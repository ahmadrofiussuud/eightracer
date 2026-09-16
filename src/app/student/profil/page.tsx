"use client";

import React, { useState } from "react";
import { UserCheck, Save, CheckCircle2, School, Phone, Mail, Building2, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
  const [phone, setPhone] = useState("+62 812-8901-2345");
  const [email, setEmail] = useState("ahmad.fauzan@student.sman8.sch.id");
  const [pilihan1, setPilihan1] = useState("S1 Ilmu Komputer - Universitas Indonesia");
  const [pilihan2, setPilihan2] = useState("S1 Teknik Informatika - ITB");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kelola Profil Siswa</h1>
        <p className="text-xs text-slate-500">Perbarui kontak dan informasi rencana studi mandiri peserta didik SMAN 8 Jakarta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Biodata & Rencana Studi</CardTitle>
          <CardDescription className="text-xs">Data identitas utama terhubung dengan Dapodik dan rekomendasi Guru BK.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            {saved && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Profil dan rencana prodi berhasil diperbarui & tersimpan ke sistem!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap</label>
                <input type="text" value="Ahmad Fauzan Rifqi" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">NISN</label>
                <input type="text" value="0058291044" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-mono" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Kelas</label>
                <input type="text" value="XII MIPA 1" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Akun</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-700">Nomor Handphone / WhatsApp Active</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-100">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  Rencana Pilihan 1 (SNBP / UTBK)
                </label>
                <input
                  type="text"
                  value={pilihan1}
                  onChange={(e) => setPilihan1(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Rencana Pilihan 2 (SNBP / UTBK)
                </label>
                <input
                  type="text"
                  value={pilihan2}
                  onChange={(e) => setPilihan2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2 border-t border-slate-100">
            <Button type="submit" disabled={loading} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 font-bold rounded-xl shadow-sm">
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Menyimpan..." : "Simpan Perubahan Profil"}</span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
