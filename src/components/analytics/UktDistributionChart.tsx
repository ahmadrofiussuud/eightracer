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
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UktDistributionData } from "@/types/student";

interface UktDistributionChartProps {
  data: UktDistributionData[];
}

export function UktDistributionChart({ data }: UktDistributionChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as UktDistributionData;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-slate-700 min-w-[220px]">
          <div className="border-b border-slate-700 pb-1">
            <p className="font-bold text-sm text-indigo-300">{item.tier}</p>
            <p className="text-[11px] text-slate-400">Nominal: {item.nominal}</p>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Jumlah Mahasiswa:</span>
            <span className="font-bold text-white">{item.count} orang</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Persentase Total:</span>
            <span className="font-bold text-emerald-400">{item.percentage}%</span>
          </div>
          {item.scholarshipCount > 0 && (
            <div className="pt-1 border-t border-slate-800 flex justify-between text-emerald-400">
              <span>Bebas UKT (KIP-K / Beasiswa):</span>
              <span className="font-bold">{item.scholarshipCount} siswa</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900">
            Sebaran Biaya Kuliah (UKT) Mahasiswa Alumni
          </CardTitle>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            Evaluasi Pembiayaan PTN
          </span>
        </div>
        <CardDescription>
          Kelompok Uang Kuliah Tunggal (UKT) yang diperoleh alumni di berbagai perguruan tinggi negeri.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-6">
        <div className="h-[250px] w-full flex items-center justify-center">
          {!isMounted ? (
            <div className="flex items-center justify-center h-full text-xs text-slate-400 animate-pulse">
              Memuat data sebaran UKT...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="tier"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#0284c7" // Sky 600
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
