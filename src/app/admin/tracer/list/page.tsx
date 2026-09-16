"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Search, Plus, Download, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockAlumniList } from "@/data/mockData";
import { AlumniStudent } from "@/types/student";
import { AlumniModalForm } from "@/components/forms/AlumniModalForm";
import { createAlumniInDb, updateAlumniInDb, deleteAlumniFromDb } from "@/app/actions/crud-actions";
import { exportToCsv } from "@/lib/export";

export default function ListAlumniAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alumniList, setAlumniList] = useState<AlumniStudent[]>(mockAlumniList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<AlumniStudent | null>(null);

  const filtered = alumniList.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingAlumni(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (alumni: AlumniStudent) => {
    setEditingAlumni(alumni);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data alumni "${name}"?`)) {
      await deleteAlumniFromDb(id);
      setAlumniList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleExport = () => {
    exportToCsv("Direktori_Alumni_SMAN8", alumniList, [
      { key: "fullName", header: "Nama Alumni" },
      { key: "nisn", header: "NISN" },
      { key: "graduationYear", header: "Angkatan" },
      { key: "university", header: "Universitas" },
      { key: "faculty", header: "Fakultas" },
      { key: "major", header: "Program Studi" },
      { key: "admissionPath", header: "Jalur Masuk" },
      { key: "cumulativeGpa", header: "IPK" },
      { key: "scholarshipStatus", header: "Beasiswa" },
    ]);
  };

  const handleFormSubmit = async (data: Omit<AlumniStudent, "id">) => {
    if (editingAlumni) {
      await updateAlumniInDb(editingAlumni.id, data);
      setAlumniList((prev) =>
        prev.map((a) => (a.id === editingAlumni.id ? { ...a, ...data } : a))
      );
    } else {
      const res = await createAlumniInDb(data);
      const newAlumni: AlumniStudent = {
        id: res.data?.id || "ALM-" + Date.now(),
        ...data,
      };
      setAlumniList((prev) => [newAlumni, ...prev]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">List Alumni Terdata</h1>
          <p className="text-xs text-slate-500">Database lengkap alumni SMAN 8 Jakarta yang menempuh pendidikan tinggi.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" className="h-8 text-xs gap-1.5 hover:bg-slate-100">
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ekspor CSV</span>
          </Button>
          <Button onClick={handleAddClick} size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Input Alumni Baru</span>
          </Button>
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
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                      <span className="text-[10px] text-slate-400 font-mono">NISN: {student.nisn}</span>
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
                    <TableCell className="font-bold text-xs text-slate-900">{Number(student.cumulativeGpa).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href="/admin/alumni-beasiswa/timeline">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-600 font-semibold gap-1 px-2">
                            <span>Timeline</span>
                            <ChevronRight className="w-3 h-3" />
                          </Button>
                        </Link>
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Edit Alumni"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id, student.fullName)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Alumni"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlumniModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingAlumni}
        title={editingAlumni ? "Edit Data Alumni" : "Tambah Alumni Baru"}
      />
    </div>
  );
}
