"use client";

import React, { useState, useTransition } from "react";
import { UserPlus, ShieldCheck, Lock, Mail, User, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createAdminAccountAction, ActionResult } from "@/app/actions/admin-auth";

export function CreateAdminForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createAdminAccountAction(null, formData);
      setState(result);
      if (result.success) {
        // Reset form if successful
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-white via-indigo-50/20 to-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <Badge variant="default" className="text-[10px] bg-indigo-600">
                Akses Terproteksi Admin
              </Badge>
            </div>
            <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
              Buat Akun Administrator Baru
            </CardTitle>
            <CardDescription className="text-xs">
              Hanya administrator terotentikasi yang dapat mendaftarkan akun pengelola sekolah baru.
            </CardDescription>
          </div>

          <Button
            type="button"
            variant={isOpen ? "outline" : "default"}
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className={`text-xs gap-1.5 self-start sm:self-auto ${
              !isOpen ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isOpen ? "Sembunyikan Form" : "Buka Form Tambah Admin"}</span>
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-1 border-t border-slate-100">
            {/* Status Feedback Message */}
            {state && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                  state.success
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border border-rose-200 text-rose-900"
                }`}
              >
                {state.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p>{state.message}</p>
                  {state.errors && (
                    <ul className="list-disc list-inside mt-1 font-normal text-[11px] space-y-0.5">
                      {Object.entries(state.errors).map(([field, errs]) => (
                        <li key={field}>
                          <strong>{field}:</strong> {errs?.join(", ")}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nama Lengkap & Gelar</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Contoh: Drs. Bambang Sutrisno, M.Pd"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">NIP / Nomor Identitas Pegawai</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="nip"
                    required
                    placeholder="Contoh: 198203152008011002"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Kedinasan</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@sman8.sch.id"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Kata Sandi Awal</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Min 8 karakter (huruf, angka & simbol)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Harus memuat huruf besar, huruf kecil, angka, dan karakter khusus.
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isPending ? "Mendaftarkan Admin..." : "Buat Akun Admin"}</span>
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
