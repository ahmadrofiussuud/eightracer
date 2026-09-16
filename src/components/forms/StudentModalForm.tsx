"use client";

import React, { useState, useEffect } from "react";
import { X, User, Hash, School, Award, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentRecord } from "@/app/actions/crud-actions";

interface StudentModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<StudentRecord, "id" | "status">) => void;
  initialData?: StudentRecord | null;
  title: string;
}

export function StudentModalForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: StudentModalFormProps) {
  const [fullName, setFullName] = useState("");
  const [nisn, setNisn] = useState("");
  const [className, setClassName] = useState("XII MIPA 1");
  const [ppdbTrack, setPpdbTrack] = useState("Prestasi Akademik");
  const [averageReportScore, setAverageReportScore] = useState(88.5);
  const [economicStatus, setEconomicStatus] = useState("Mampu");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setNisn(initialData.nisn);
      setClassName(initialData.className);
      setPpdbTrack(initialData.ppdbTrack);
      setAverageReportScore(initialData.averageReportScore);
      setEconomicStatus(initialData.economicStatus || "Mampu");
    } else {
      setFullName("");
      setNisn("");
      setClassName("XII MIPA 1");
      setPpdbTrack("Prestasi Akademik");
      setAverageReportScore(88.5);
      setEconomicStatus("Mampu");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName,
      nisn,
      className,
      ppdbTrack,
      averageReportScore: Number(averageReportScore),
      economicStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <User className="w-5 h-5" />
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Nama Lengkap Siswa</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Misal: Ahmad Fauzan Rifqi"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">NISN (10 Digit)</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="0051234567"
                required
                maxLength={10}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Kelas</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {["XII MIPA 1", "XII MIPA 2", "XII MIPA 3", "XII MIPA 4", "XII IPS 1", "XII IPS 2"].map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Jalur PPDB</label>
              <select
                value={ppdbTrack}
                onChange={(e) => setPpdbTrack(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {["Prestasi Akademik", "Afirmasi / KETM", "Zonasi", "Pindahan Ortu"].map((track) => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Rata-rata Rapor</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={averageReportScore}
                onChange={(e) => setAverageReportScore(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Status Ekonomi</label>
              <select
                value={economicStatus}
                onChange={(e) => setEconomicStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Mampu">Mampu</option>
                <option value="Prasejahtera (KIP)">Prasejahtera (KIP)</option>
                <option value="Rentan Miskin">Rentan Miskin</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Batal
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-1.5">
              <Check className="w-4 h-4" /> Simpan Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
