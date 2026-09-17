"use client";

import React from "react";
import { Wallet, Sparkles, Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockActiveStudents } from "@/data/mockData";
import { exportToCsv } from "@/lib/export";

export default function LatarBelakangEkonomiPage() {
  const handleExport = () => {
    exportToCsv(
      "Rekap_DTKS_SMAN8",
      mockActiveStudents,
      [
        { key: "fullName", header: "Nama Siswa" },
        { key: "nisn", header: "NISN" },
        { key: "className", header: "Kelas" },
        { key: "economicStatus", header: "Status Ekonomi" },
        { key: "ppdbTrack", header: "Jalur PPDB" },
      ]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Latar Belakang Ekonomi Murid</h1>
          <p className="text-xs text-slate-500">Pendataan status ekonomi keluarga, verifikasi DTKS Kemensos, dan kesiapan afirmasi KIP-Kuliah.</p>
        </div>
        <Button onClick={handleExport} variant="outline" size="sm" className="h-8 text-xs gap-1.5 self-start sm:self-auto hover:bg-slate-100">
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Rekap DTKS</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-4 bg-emerald-50/60 border-emerald-200">
          <span className="text-xs font-semibold text-emerald-800">Siswa Terdaftar DTKS (KIP)</span>
          <div className="text-2xl font-black text-emerald-950 mt-1">78 Siswa</div>
          <span className="text-[11px] text-emerald-700">Prioritas Beasiswa KIP-Kuliah</span>
        </Card>
        <Card className="p-4 bg-indigo-50/60 border-indigo-200">
          <span className="text-xs font-semibold text-indigo-800">Ekonomi Menengah</span>
          <div className="text-2xl font-black text-indigo-950 mt-1">840 Siswa</div>
          <span className="text-[11px] text-indigo-700">Penyesuaian UKT Golongan 3-5</span>
        </Card>
        <Card className="p-4 bg-slate-50 border-slate-200">
          <span className="text-xs font-semibold text-slate-700">Keluarga Mampu / Mandiri</span>
          <div className="text-2xl font-black text-slate-900 mt-1">330 Siswa</div>
          <span className="text-[11px] text-slate-500">Jalur Reguler & Beasiswa Swasta</span>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Daftar Verifikasi Data Ekonomi</CardTitle>
          <CardDescription className="text-xs">Digunakan oleh Tim BK untuk validasi faktual bantuan beasiswa.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status Ekonomi</TableHead>
                  <TableHead>Jalur PPDB</TableHead>
                  <TableHead>Status Verifikasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockActiveStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-bold text-xs sm:text-sm text-slate-900">{student.fullName}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{student.className}</Badge></TableCell>
                    <TableCell>
                      {student.economicStatus.includes("KIP") ? (
                        <Badge variant="kipk" className="text-[10px] gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          Prasejahtera (KIP)
                        </Badge>
                      ) : (
                        <span className="text-xs text-slate-600">{student.economicStatus}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">{student.ppdbTrack}</TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Faktual Valid
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
