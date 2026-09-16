"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Search, Building2, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAlumniList } from "@/data/mockData";

export default function StudentTracerPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockAlumniList.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Study Tracer (Direktori Alumni)</h1>
        <p className="text-xs text-slate-500">Eksplorasi pilihan kampus, jurusan, dan pengalaman kakak kelas alumni SMAN 8 Jakarta (Read-Only).</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Daftar Sebaran Alumni di PTN</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kampus atau prodi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Alumni</TableHead>
                  <TableHead>Universitas & Program Studi</TableHead>
                  <TableHead>Angkatan</TableHead>
                  <TableHead>Jalur</TableHead>
                  <TableHead>Status Beasiswa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-bold text-xs sm:text-sm text-slate-900">{student.fullName}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-xs text-slate-800 block">{student.university}</span>
                      <span className="text-[11px] text-slate-500">{student.major}</span>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{student.graduationYear}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{student.admissionPath}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={student.scholarshipStatus === "KIP-Kuliah" ? "kipk" : "outline"} className="text-[10px]">
                        {student.scholarshipStatus}
                      </Badge>
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
