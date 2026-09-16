"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KipkDistributionData } from "@/types/student";

interface KipkPieChartProps {
  data: KipkDistributionData[];
  totalAlumni: number;
}

export function KipkPieChart({ data, totalAlumni }: KipkPieChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as KipkDistributionData;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 border border-slate-700">
          <p className="font-semibold text-sm flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: item.fill }}
            />
            {item.name}
          </p>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Jumlah Mahasiswa:</span>
            <span className="font-bold text-white">{item.value.toLocaleString("id-ID")} siswa</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Proporsi:</span>
            <span className="font-bold text-emerald-400">{item.percentage}%</span>
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
            Distribusi Status Beasiswa Alumni
          </CardTitle>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            KIP-Kuliah Focused
          </span>
        </div>
        <CardDescription>
          Perbandingan penerima beasiswa KIP-K, mandiri, dan beasiswa prestasi lainnya.
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
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={900}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill} 
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) => (
                    <span className="text-xs font-medium text-slate-700">
                      {value} ({entry.payload.percentage}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Breakdown chips */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100/80">
            <span className="text-[11px] font-semibold text-emerald-800 block">
              Penerima KIP-Kuliah
            </span>
            <span className="text-lg font-bold text-emerald-900">
              {data[0]?.value || 0}{" "}
              <span className="text-xs font-normal text-emerald-700">
                ({data[0]?.percentage || 0}%)
              </span>
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100/80">
            <span className="text-[11px] font-semibold text-indigo-800 block">
              Reguler / Non-Beasiswa
            </span>
            <span className="text-lg font-bold text-indigo-900">
              {data[1]?.value || 0}{" "}
              <span className="text-xs font-normal text-indigo-700">
                ({data[1]?.percentage || 0}%)
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
