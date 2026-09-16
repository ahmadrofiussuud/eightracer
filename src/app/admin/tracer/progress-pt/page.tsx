"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Sparkles, TrendingUp, Download, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAlumniList } from "@/data/mockData";

export default function ProgressAlumniPtPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alumni di PT (Input & Kelola Progress)</h1>
          <p className="text-xs text-slate-500">Pemantauan kelangsungan studi, pencairan beasiswa KIP-K, besaran UKT, dan capaian IPK mahasiswa.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Rekap IPK</span>
          </Button>
          <Link href="/admin/alumni-beasiswa/analitik">
            <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700">
              <span>Buka Analitik Beasiswa</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tabel Progres Mahasiswa di Perguruan Tinggi</CardTitle>
          <CardDescription className="text-xs">Data dievaluasi per semester berdasarkan laporan PDDikti dan verifikasi Puslapdik.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>Universitas & Fakultas</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Kelompok UKT</TableHead>
                  <TableHead>Status Beasiswa</TableHead>
                  <TableHead>IPK Terkini</TableHead>
                  <TableHead>Status Evaluasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAlumniList.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">{student.fullName}</span>
                      <span className="text-[10px] text-slate-400">Angkatan {student.graduationYear}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-xs text-slate-800 block">{student.university}</span>
                      <span className="text-[11px] text-slate-500">{student.faculty}</span>
                    </TableCell>
                    <TableCell><span className="text-xs font-semibold text-slate-700">Sem. {student.currentSemester}</span></TableCell>
                    <TableCell><span className="text-xs text-slate-700">{student.uktTier}</span></TableCell>
                    <TableCell>
                      <Badge variant={student.scholarshipStatus === "KIP-Kuliah" ? "kipk" : "outline"} className="text-[10px]">
                        {student.scholarshipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-xs text-slate-900">{student.cumulativeGpa.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Memenuhi Syarat
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
