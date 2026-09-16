"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileCheck2, Plus, Save, School, GraduationCap, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdmissionPath, ScholarshipStatus, StudentStatus } from "@/types/student";
import { createAlumniInDb } from "@/app/actions/crud-actions";

export default function InputKelolaTracerPage() {
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [admissionPath, setAdmissionPath] = useState<AdmissionPath>("SNBP");
  const [graduationYear, setGraduationYear] = useState(2024);
  const [scholarshipStatus, setScholarshipStatus] = useState<ScholarshipStatus>("KIP-Kuliah");
  const [gpa, setGpa] = useState(3.75);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    await createAlumniInDb({
      nisn,
      fullName,
      graduationYear: Number(graduationYear),
      highSchoolClass: "XII MIPA 1",
      university,
      faculty: "Fakultas Utama",
      major,
      admissionPath,
      currentSemester: 4,
      cumulativeGpa: Number(gpa),
      uktTier: "Golongan 1 (Subsidi KIP-K)",
      uktFee: 0,
      scholarshipStatus,
      status: "Aktif Berprestasi" as StudentStatus,
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);

    setFullName("");
    setNisn("");
    setUniversity("");
    setMajor("");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Input & Kelola Data Tracer Alumni</h1>
          <p className="text-xs text-slate-500">Pencatatan data kelulusan perguruan tinggi, fakultas, program studi, dan jalur masuk.</p>
        </div>
        <Link href="/admin/tracer/list">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Lihat Direktori Alumni</span>
          </Button>
        </Link>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs sm:text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Data tracer alumni berhasil disimpan ke sistem!</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formulir Pendataan Alumni Baru</CardTitle>
          <CardDescription className="text-xs">Diisi berdasarkan hasil pengumuman resmi SNBP, SNBT, atau Ujian Mandiri PTN.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama alumni"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">NISN Siswa</label>
                <input
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10 digit NISN"
                  required
                  maxLength={10}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nama Perguruan Tinggi (PTN/PTS)</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Contoh: Universitas Indonesia"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Program Studi / Jurusan</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="Contoh: S1 Ilmu Komputer"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Jalur Penerimaan</label>
                <select
                  value={admissionPath}
                  onChange={(e) => setAdmissionPath(e.target.value as AdmissionPath)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="SNBP">SNBP (Prestasi)</option>
                  <option value="SNBT">SNBT (UTBK)</option>
                  <option value="Mandiri">Seleksi Mandiri PTN</option>
                  <option value="Kedinasan">Ikatan Dinas</option>
                  <option value="Internasional">Internasional</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Tahun Kelulusan SMA</label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Status Beasiswa</label>
                <select
                  value={scholarshipStatus}
                  onChange={(e) => setScholarshipStatus(e.target.value as ScholarshipStatus)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="KIP-Kuliah">KIP-Kuliah</option>
                  <option value="Non-Beasiswa">Non-Beasiswa</option>
                  <option value="Beasiswa Unggulan">Beasiswa Unggulan</option>
                  <option value="Beasiswa Swasta">Beasiswa Swasta</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">IPK Terkini (Misal: 3.85)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.00"
                  value={gpa}
                  onChange={(e) => setGpa(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Link href="/admin/tracer/list">
              <Button type="button" variant="outline" size="sm" className="text-xs">Batal</Button>
            </Link>
            <Button type="submit" disabled={loading} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shadow-sm">
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Simpan..." : "Simpan Data Tracer"}</span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
