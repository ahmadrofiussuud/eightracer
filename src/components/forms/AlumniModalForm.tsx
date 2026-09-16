"use client";

import React, { useState, useEffect } from "react";
import { X, GraduationCap, Building2, BookOpen, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlumniStudent, AdmissionPath, ScholarshipStatus, StudentStatus } from "@/types/student";

interface AlumniModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alumni: Omit<AlumniStudent, "id">) => void;
  initialData?: AlumniStudent | null;
  title: string;
}

export function AlumniModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: AlumniModalFormProps) {
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [graduationYear, setGraduationYear] = useState(2024);
  const [highSchoolClass, setHighSchoolClass] = useState("XII MIPA 1");
  const [university, setUniversity] = useState("Universitas Indonesia");
  const [faculty, setFaculty] = useState("Fakultas Ilmu Komputer");
  const [major, setMajor] = useState("Ilmu Komputer");
  const [admissionPath, setAdmissionPath] = useState<AdmissionPath>("SNBP");
  const [currentSemester, setCurrentSemester] = useState(4);
  const [cumulativeGpa, setCumulativeGpa] = useState(3.75);
  const [uktTier, setUktTier] = useState("Golongan 1 (Subsidi KIP-K)");
  const [scholarshipStatus, setScholarshipStatus] = useState<ScholarshipStatus>("KIP-Kuliah");
  const [status, setStatus] = useState<StudentStatus>("Aktif Berprestasi");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setNisn(initialData.nisn);
      setGraduationYear(initialData.graduationYear);
      setHighSchoolClass(initialData.highSchoolClass);
      setUniversity(initialData.university);
      setFaculty(initialData.faculty);
      setMajor(initialData.major);
      setAdmissionPath(initialData.admissionPath);
      setCurrentSemester(initialData.currentSemester);
      setCumulativeGpa(initialData.cumulativeGpa);
      setUktTier(initialData.uktTier);
      setScholarshipStatus(initialData.scholarshipStatus);
      setStatus(initialData.status);
    } else {
      setFullName("");
      setNisn("");
      setGraduationYear(2024);
      setHighSchoolClass("XII MIPA 1");
      setUniversity("Universitas Indonesia");
      setFaculty("Fakultas Ilmu Komputer");
      setMajor("Ilmu Komputer");
      setAdmissionPath("SNBP");
      setCurrentSemester(4);
      setCumulativeGpa(3.75);
      setUktTier("Golongan 1 (Subsidi KIP-K)");
      setScholarshipStatus("KIP-Kuliah");
      setStatus("Aktif Berprestasi");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName,
      nisn,
      graduationYear: Number(graduationYear),
      highSchoolClass,
      university,
      faculty,
      major,
      admissionPath,
      currentSemester: Number(currentSemester),
      cumulativeGpa: Number(cumulativeGpa),
      uktTier,
      uktFee: 0,
      scholarshipStatus,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-4 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Nama Alumni</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Alumni"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">NISN</label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="0051234567"
                required
                maxLength={10}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Universitas (PTN)</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Universitas Indonesia"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Program Studi</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Ilmu Komputer"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Jalur Masuk</label>
              <select
                value={admissionPath}
                onChange={(e) => setAdmissionPath(e.target.value as AdmissionPath)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {["SNBP", "SNBT", "Mandiri", "Kedinasan", "Internasional"].map((path) => (
                  <option key={path} value={path}>{path}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">IPK Kumulatif</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.00"
                value={cumulativeGpa}
                onChange={(e) => setCumulativeGpa(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Semester</label>
              <input
                type="number"
                min="1"
                max="14"
                value={currentSemester}
                onChange={(e) => setCurrentSemester(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Status Beasiswa</label>
              <select
                value={scholarshipStatus}
                onChange={(e) => setScholarshipStatus(e.target.value as ScholarshipStatus)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {["KIP-Kuliah", "Non-Beasiswa", "Beasiswa Unggulan", "Beasiswa Swasta", "BPI"].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Status Keaktifan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StudentStatus)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {["Aktif Berprestasi", "Aktif", "Lulus PTN", "Magang / MBKM", "Cuti", "Drop Out"].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Batal
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5">
              <Check className="w-4 h-4" /> Simpan Alumni
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
