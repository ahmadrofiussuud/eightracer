"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search, Plus, Download, Filter, CheckCircle2, Edit2, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockActiveStudents } from "@/data/mockData";
import { StudentModalForm } from "@/components/forms/StudentModalForm";
import { StudentRecord, fetchStudentsFromDb, createStudentInDb, updateStudentInDb, deleteStudentFromDb } from "@/app/actions/crud-actions";
import { exportToCsv } from "@/lib/export";

export default function BiodataMuridAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>(mockActiveStudents as unknown as StudentRecord[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  useEffect(() => {
    async function loadData() {
      const dbStudents = await fetchStudentsFromDb();
      if (dbStudents.length > 0) {
        setStudents(dbStudents);
      }
    }
    loadData();
  }, []);

  const filtered = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || s.nisn.includes(searchTerm)
  );

  const handleAddClick = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student: StudentRecord) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data murid "${name}"?`)) {
      await deleteStudentFromDb(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleExport = () => {
    exportToCsv("Daftar_Induk_Siswa_SMAN8", students, [
      { key: "fullName", header: "Nama Lengkap" },
      { key: "nisn", header: "NISN" },
      { key: "className", header: "Kelas" },
      { key: "ppdbTrack", header: "Jalur PPDB" },
      { key: "averageReportScore", header: "Rata-Rapor" },
      { key: "economicStatus", header: "Status Ekonomi" },
    ]);
  };

  const handleFormSubmit = async (data: Omit<StudentRecord, "id" | "status">) => {
    if (editingStudent) {
      await updateStudentInDb(editingStudent.id, data);
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
      );
    } else {
      const res = await createStudentInDb(data);
      const newStudent: StudentRecord = {
        id: res.data?.id || "STD-" + Date.now(),
        ...data,
        status: "Aktif",
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Biodata Murid (Input & Kelola)</h1>
          <p className="text-xs text-slate-500">Pusat data induk peserta didik SMAN 8 Jakarta terintegrasi Dapodik.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" className="h-8 text-xs gap-1.5 hover:bg-slate-100">
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ekspor CSV</span>
          </Button>
          <Button onClick={handleAddClick} size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Murid Baru</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Daftar Induk Siswa</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari siswa atau NISN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>NISN</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Jalur PPDB</TableHead>
                  <TableHead>Rata-rata Rapor</TableHead>
                  <TableHead>Status Dapodik</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-bold text-xs sm:text-sm text-slate-900">{student.fullName}</TableCell>
                    <TableCell className="text-xs text-slate-500 font-mono">{student.nisn}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{student.className}</Badge></TableCell>
                    <TableCell className="text-xs text-slate-700">{student.ppdbTrack}</TableCell>
                    <TableCell className="font-bold text-xs text-indigo-700">{Number(student.averageReportScore).toFixed(1)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Aktif
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Murid"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id, student.fullName)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Murid"
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

      <StudentModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
        title={editingStudent ? "Edit Data Murid" : "Tambah Murid Baru"}
      />
    </div>
  );
}
