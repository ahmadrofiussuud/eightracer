"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GpaDistributionData } from "@/types/student";

interface GpaBarChartProps {
  data: GpaDistributionData[];
  averageGpa: number;
}

export function GpaBarChart({ data, averageGpa }: GpaBarChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const kipkVal = payload.find((p: any) => p.dataKey === "kipkCount")?.value || 0;
      const regularVal = payload.find((p: any) => p.dataKey === "regularCount")?.value || 0;
      const total = kipkVal + regularVal;

      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-2 border border-slate-700 min-w-[200px]">
          <div className="border-b border-slate-700 pb-1">
            <span className="text-[11px] text-slate-400">Rentang Indeks Prestasi (IPK):</span>
            <p className="font-bold text-sm text-indigo-300">{label}</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                Penerima KIP-K:
              </span>
              <span className="font-bold text-white">{kipkVal} siswa</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                Siswa Reguler:
              </span>
              <span className="font-bold text-white">{regularVal} siswa</span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex justify-between font-semibold text-slate-200">
              <span>Total Alumni:</span>
              <span className="text-emerald-400 font-bold">{total} siswa</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900">
            Distribusi Prestasi Akademik (IPK)
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Rata-rata: {averageGpa.toFixed(2)}
            </span>
          </div>
        </div>
        <CardDescription>
          Perbandingan capaian IPK mahasiswa penerima KIP-Kuliah vs mahasiswa reguler di universitas.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-6">
        <div className="h-[280px] w-full flex items-center justify-center">
          {!isMounted ? (
            <div className="flex items-center justify-center h-full text-xs text-slate-400 animate-pulse">
              Memuat visualisasi diagram...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => {
                    if (value === "kipkCount") return <span className="text-xs font-medium text-slate-700">Penerima KIP-K</span>;
                    if (value === "regularCount") return <span className="text-xs font-medium text-slate-700">Mahasiswa Reguler</span>;
                    return value;
                  }}
                />
                <Bar
                  dataKey="kipkCount"
                  name="kipkCount"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                  animationDuration={900}
                />
                <Bar
                  dataKey="regularCount"
                  name="regularCount"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Insight footer */}
        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              <strong>60.5%</strong> penerima KIP-K meraih IPK di atas <strong>3.50</strong> (Sangat Memuaskan).
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Sumber: Verifikasi PDDikti
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
