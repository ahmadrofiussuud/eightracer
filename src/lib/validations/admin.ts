import { z } from "zod";

// Schema for restricted admin creation (Only called by authenticated admins)
export const createAdminSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter")
    .regex(/^[a-zA-Z\s.,'-]+$/, "Nama hanya boleh memuat huruf dan tanda baca gelar"),
  nip: z
    .string()
    .min(8, "NIP / Nomor Pegawai minimal 8 karakter")
    .max(30, "NIP maksimal 30 karakter")
    .regex(/^[0-9]+$/, "NIP hanya boleh memuat angka"),
  email: z
    .string()
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(100, "Kata sandi maksimal 100 karakter")
    .regex(/[A-Z]/, "Harus memuat setidaknya 1 huruf besar")
    .regex(/[a-z]/, "Harus memuat setidaknya 1 huruf kecil")
    .regex(/[0-9]/, "Harus memuat setidaknya 1 angka")
    .regex(/[^A-Za-z0-9]/, "Harus memuat setidaknya 1 karakter simbol"),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;

// Schema for student self-registration (Strictly locks out any role parameter)
export const studentRegisterSchema = z.object({
  fullName: z.string().min(3).max(100),
  nisn: z.string().length(10, "NISN harus tepat 10 digit angka").regex(/^\d{10}$/, "NISN hanya boleh angka"),
  email: z.string().email().max(255).toLowerCase(),
  password: z.string().min(8).max(100),
});

export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
