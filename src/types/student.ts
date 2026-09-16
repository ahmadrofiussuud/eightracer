export type AdmissionPath = "SNBP" | "SNBT" | "Mandiri" | "Kedinasan" | "Internasional";

export type ScholarshipStatus = "KIP-Kuliah" | "Non-Beasiswa" | "Beasiswa Unggulan" | "Beasiswa Swasta" | "BPI";

export type StudentStatus = "Aktif Berprestasi" | "Aktif" | "Lulus PTN" | "Magang / MBKM" | "Cuti" | "Drop Out";

export type MilestoneCategory = 
  | "SMA" 
  | "Seleksi Masuk" 
  | "Beasiswa" 
  | "Akademik" 
  | "Prestasi" 
  | "Magang & Karir";

export interface Milestone {
  id: string;
  alumniId: string;
  title: string;
  category: MilestoneCategory;
  date: string;
  semester?: number | string;
  description: string;
  gpa?: number;
  highlightBadge?: string;
  institution?: string;
  statusType?: "success" | "info" | "warning" | "default";
  tags?: string[];
  documents?: {
    name: string;
    url?: string;
  }[];
}

export interface AlumniStudent {
  id: string;
  nisn: string;
  fullName: string;
  avatarUrl?: string;
  graduationYear: number;
  highSchoolClass: string;
  university: string;
  faculty: string;
  major: string;
  admissionPath: AdmissionPath;
  currentSemester: number;
  cumulativeGpa: number; // IPK
  uktTier: string; // e.g. "Golongan 1 (KIP-K)", "Golongan 3"
  uktFee: number; // in IDR
  scholarshipStatus: ScholarshipStatus;
  status: StudentStatus;
  phone?: string;
  email?: string;
  linkedin?: string;
  advisorNotes?: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  changePercent?: string;
  trend?: "up" | "down" | "neutral";
  subtitle: string;
  iconName: string;
}

export interface KipkDistributionData {
  name: string;
  value: number;
  percentage: number;
  fill: string;
}

export interface GpaDistributionData {
  range: string;
  count: number;
  kipkCount: number;
  regularCount: number;
  averageUkt: number;
}

export interface UktDistributionData {
  tier: string;
  nominal: string;
  count: number;
  percentage: number;
  scholarshipCount: number;
}
