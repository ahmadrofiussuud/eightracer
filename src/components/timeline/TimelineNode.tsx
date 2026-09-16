import React from "react";
import { 
  School, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  Calendar,
  Building,
  Sparkles
} from "lucide-react";
import { Milestone, MilestoneCategory } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineNodeProps {
  milestone: Milestone;
  isLast?: boolean;
}

export function TimelineNode({ milestone, isLast = false }: TimelineNodeProps) {
  // Select icon and styles based on category
  const getCategoryConfig = (category: MilestoneCategory) => {
    switch (category) {
      case "SMA":
        return {
          icon: School,
          iconBg: "bg-blue-600 text-white shadow-blue-200",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
          nodeRing: "border-blue-500",
        };
      case "Seleksi Masuk":
        return {
          icon: GraduationCap,
          iconBg: "bg-indigo-600 text-white shadow-indigo-200",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
          nodeRing: "border-indigo-500",
        };
      case "Beasiswa":
        return {
          icon: Sparkles,
          iconBg: "bg-emerald-600 text-white shadow-emerald-200",
          badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          nodeRing: "border-emerald-500",
        };
      case "Akademik":
        return {
          icon: BookOpen,
          iconBg: "bg-violet-600 text-white shadow-violet-200",
          badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
          nodeRing: "border-violet-500",
        };
      case "Prestasi":
        return {
          icon: Award,
          iconBg: "bg-amber-500 text-white shadow-amber-200",
          badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
          nodeRing: "border-amber-500",
        };
      case "Magang & Karir":
        return {
          icon: Briefcase,
          iconBg: "bg-slate-800 text-white shadow-slate-200",
          badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
          nodeRing: "border-slate-600",
        };
      default:
        return {
          icon: CheckCircle2,
          iconBg: "bg-indigo-600 text-white shadow-indigo-200",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
          nodeRing: "border-indigo-500",
        };
    }
  };

  const config = getCategoryConfig(milestone.category);
  const IconComponent = config.icon;

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Vertical Spine Line */}
      {!isLast && (
        <div className="absolute left-5 sm:left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-indigo-200 to-slate-200 -translate-x-1/2 group-hover:from-indigo-400 group-hover:to-indigo-300 transition-colors" />
      )}

      {/* Node Icon Circle */}
      <div className="relative z-10 flex items-center justify-center">
        <div
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110",
            config.iconBg
          )}
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Milestone Card Content */}
      <div className="flex-1 pb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 group-hover:border-indigo-200">
          {/* Header Row: Date & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                  config.badgeColor
                )}
              >
                {milestone.category}
              </span>

              {milestone.highlightBadge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  {milestone.highlightBadge}
                </span>
              )}

              {milestone.gpa && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  IPS: {milestone.gpa.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{milestone.date}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {milestone.title}
          </h3>

          {/* Institution if present */}
          {milestone.institution && (
            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{milestone.institution}</span>
            </div>
          )}

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {milestone.description}
          </p>

          {/* Tags */}
          {milestone.tags && milestone.tags.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
