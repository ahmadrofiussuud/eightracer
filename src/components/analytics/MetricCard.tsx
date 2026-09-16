import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  changePercent?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  accentColor?: "indigo" | "emerald" | "amber" | "violet" | "rose";
}

export function MetricCard({
  title,
  value,
  subtitle,
  changePercent,
  trend = "neutral",
  icon,
  accentColor = "indigo",
}: MetricCardProps) {
  const accentStyles = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200/80">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </div>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-xl border flex items-center justify-center shadow-xs",
              accentStyles[accentColor]
            )}
          >
            {icon}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-500">{subtitle}</span>

          {changePercent && (
            <div
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-md",
                trend === "up" && "text-emerald-700 bg-emerald-50",
                trend === "down" && "text-rose-700 bg-rose-50",
                trend === "neutral" && "text-slate-600 bg-slate-100"
              )}
            >
              {trend === "up" && <ArrowUpRight className="w-3.5 h-3.5" />}
              {trend === "down" && <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend === "neutral" && <Minus className="w-3 h-3" />}
              <span>{changePercent}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
