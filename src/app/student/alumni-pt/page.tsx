"use client";

import React from "react";
import { TrendingUp, Award, BookOpen, Building2, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAlumniList } from "@/data/mockData";

export default function TrackAlumniPtStudentPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Track Alumni di PT (Progres Studi)</h1>
        <p className="text-xs text-slate-500">Gambaran pencapaian akademik dan studi lanjut alumni di universitas (Read-Only).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-4 bg-emerald-50/60 border-emerald-200">
          <span className="text-xs font-semibold text-emerald-800">Rata-rata IPK Alumni</span>
          <div className="text-2xl font-black text-emerald-950 mt-1">3.63 / 4.00</div>
          <span className="text-[11px] text-emerald-700">Mayoritas Predikat Sangat Memuaskan</span>
        </Card>

        <Card className="p-4 bg-indigo-50/60 border-indigo-200">
          <span className="text-xs font-semibold text-indigo-800">Tingkat Kelulusan Tepat Waktu</span>
          <div className="text-2xl font-black text-indigo-950 mt-1">94.8%</div>
          <span className="text-[11px] text-indigo-700">Sarjana S1 (8 Semester)</span>
        </Card>

        <Card className="p-4 bg-slate-50 border-slate-200">
          <span className="text-xs font-semibold text-slate-700">Penerima Beasiswa KIP-K</span>
          <div className="text-2xl font-black text-slate-900 mt-1">238 Mahasiswa</div>
          <span className="text-[11px] text-slate-500">100% Bebas Biaya Kuliah</span>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Progres Semester & Capaian Akademik</CardTitle>
          <CardDescription className="text-xs">Inspirasi capaian akademik dari para alumni SMAN 8 Jakarta.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>Perguruan Tinggi</TableHead>
                  <TableHead>Semester Aktif</TableHead>
                  <TableHead>Status Beasiswa</TableHead>
                  <TableHead>IPK</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAlumniList.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">{student.fullName}</span>
                      <span className="text-[10px] text-slate-400">Lulusan Th. {student.graduationYear}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-xs text-slate-800 block">{student.university}</span>
                      <span className="text-[11px] text-slate-500">{student.major}</span>
                    </TableCell>
                    <TableCell><span className="text-xs font-semibold text-slate-700">Semester {student.currentSemester}</span></TableCell>
                    <TableCell>
                      <Badge variant={student.scholarshipStatus === "KIP-Kuliah" ? "kipk" : "outline"} className="text-[10px]">
                        {student.scholarshipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold text-xs text-slate-900">{student.cumulativeGpa.toFixed(2)}</TableCell>
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
