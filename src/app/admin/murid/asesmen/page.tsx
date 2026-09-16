"use client";

import React from "react";
import { Compass, Plus, Download, Brain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAssessments } from "@/data/mockData";

export default function AsesmenKarakteristikAdminPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Asesmen Karakteristik (Input & Kelola)</h1>
          <p className="text-xs text-slate-500">Hasil tes psikologi bakat minat, kode kepribadian Holland RIASEC, dan pemetaan prodi PTN.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Rekap</span>
          </Button>
          <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Input Hasil Asesmen</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Daftar Hasil Asesmen Peserta Didik</CardTitle>
          <CardDescription className="text-xs">Data menjadi acuan Guru BK dalam merancang rekomendasi jurusan SNBP.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Murid</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Kode RIASEC</TableHead>
                  <TableHead>Minat Utama</TableHead>
                  <TableHead>Rekomendasi Program Studi</TableHead>
                  <TableHead>Status Kesiapan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssessments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold text-xs sm:text-sm text-slate-900">{item.studentName}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{item.className}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs font-mono text-indigo-700 bg-indigo-50">{item.riasecTopCode.slice(0, 3)}</Badge></TableCell>
                    <TableCell className="text-xs text-slate-700">{item.primaryInterest}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.recommendedMajors.slice(0, 2).map((m) => (
                          <span key={m} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{m}</span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.readinessCategory === "Sangat Siap PTN" ? "success" : "warning"} className="text-[10px]">
                        {item.readinessCategory}
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
