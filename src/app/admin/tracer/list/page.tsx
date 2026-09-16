"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Search, Plus, Download, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAlumniList } from "@/data/mockData";

export default function ListAlumniAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockAlumniList.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">List Alumni Terdata</h1>
          <p className="text-xs text-slate-500">Database lengkap alumni SMAN 8 Jakarta yang menempuh pendidikan tinggi.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data</span>
          </Button>
          <Link href="/admin/tracer/kelola">
            <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Input Alumni Baru</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Daftar Lulusan di Perguruan Tinggi</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, kampus, prodi..."
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
                  <TableHead>IPK</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">{student.fullName}</span>
                      <span className="text-[10px] text-slate-400">NISN: {student.nisn}</span>
                    </TableCell>
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
                    <TableCell className="font-bold text-xs text-slate-900">{student.cumulativeGpa.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/alumni-beasiswa/timeline`}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-600 font-semibold gap-1">
                          <span>Timeline</span>
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </Link>
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
