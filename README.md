# Eightracer 🎓
**Sistem Pelacakan Siswa & Capaian Alumni SMAN 8 Jakarta**

Eightracer adalah aplikasi berbasis web yang dirancang untuk melacak rekam jejak akademik siswa sejak masa penerimaan SMA, seleksi masuk perguruan tinggi negeri (SNBP/SNBT/Mandiri), hingga progres perkuliahan, pembiayaan UKT, dan keberhasilan beasiswa (KIP-Kuliah, Beasiswa Unggulan).

---

## Fitur Utama

1. **Dashboard Alumni & Beasiswa (`/dashboard/alumni`)**:
   - **Kartu Metrik KPI**: Total alumni terdata, persentase penerima beasiswa KIP-Kuliah, rata-rata IPK kumulatif, dan tingkat kelulusan PTN.
   - **Diagram Distribusi KIP-K (Recharts Pie/Donut Chart)**: Visualisasi proporsi mahasiswa beasiswa KIP-Kuliah vs non-beasiswa reguler vs beasiswa unggulan/swasta.
   - **Diagram Distribusi IPK (Recharts Grouped Bar Chart)**: Sebaran capaian indeks prestasi kumulatif mahasiswa per rentang nilai (< 3.00, 3.00-3.24, 3.25-3.49, 3.50-3.74, 3.75-4.00 Cumlaude) membandingkan penerima KIP-K vs mahasiswa reguler.
   - **Distribusi UKT (Recharts Bar Chart)**: Evaluasi kelompok Uang Kuliah Tunggal (Golongan 1 hingga 6+).
   - **Direktori Alumni Interaktif**: Tabel pencarian dan filter cerdas berdasarkan prodi, perguruan tinggi, dan status beasiswa dengan tautan langsung menuju linimasa individu.

2. **Linimasa Interaktif Alumni (`/dashboard/alumni/[id]`)**:
   - **Profil Hero Mahasiswa**: Menampilkan NISN, asal angkatan/kelas SMA, universitas, fakultas & program studi, jalur masuk, semester aktif, dan IPK terkini.
   - **Linimasa Vertikal (Vertical Timeline)**: Menyajikan tahapan perjalanan siswa dari PPDB SMA, prestasi OSN, kelulusan SNBP pilihan pertama, verifikasi KIP-Kuliah, Dean's List per semester, peran asisten laboratorium, hingga program Magang MSIB Kampus Merdeka.
   - **Filter Linimasa**: Penyaringan instan berdasarkan kategori (Semua, SMA & Prestasi, Seleksi PTN, Beasiswa KIP-K, Akademik, Magang & Karir).
   - **Panel Analitik Samping**: Grafik tren IPK per semester (IPS), status pencarian/bantuan biaya hidup KIP-K, dan catatan komunikasi guru BP/BK.

3. **Navigasi Lengkap**:
   - **Overview**: Ringkasan pusat kendali Eightracer.
   - **Data Murid**: Database siswa aktif kelas X-XII.
   - **Asesmen**: Pemetaan minat bakat dan hasil tes psikologi.
   - **Eligibilitas**: Pemeringkatan kuota SNBP 40% siswa berprestasi.
   - **Dashboard Alumni & Beasiswa**: Visualisasi analitik dan linimasa lulusan.

4. **Integrasi Supabase Fleksibel**:
   - Konfigurasi siap pakai di `src/lib/supabase.ts`.
   - Terintegrasi otomatis dengan **fallback data dummy cerdas** sehingga UI dapat langsung berjalan tanpa harus terhubung ke database online terlebih dahulu.

---

## Petunjuk Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18 ke atas (disarankan v20 atau v24)
- npm atau pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (Opsional)
Jika Anda ingin menyambungkan langsung ke proyek Supabase cloud:
1. Salin `.env.example` ke `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Isi URL dan Anon Key dari dashboard Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Catatan: Jika variabel tidak diisi, Eightracer akan otomatis menggunakan mock data lokal dengan notifikasi informatif di konsol).*

### 4. Menjalankan Development Server
```bash
npm run dev
```

Buka browser Anda di [http://localhost:3000](http://localhost:3000). Aplikasi akan otomatis mengarahkan Anda ke Dashboard Alumni & Beasiswa.

### 5. Build Produksi
```bash
npm run build
npm run start
```

---

## Skema Tabel Rekomendasi untuk Supabase (SQL)

Jika Anda ingin membuat tabel di Supabase SQL Editor:

```sql
-- Tabel Profil Alumni
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nisn VARCHAR(10) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  graduation_year INT NOT NULL,
  high_school_class VARCHAR(50) NOT NULL,
  university VARCHAR(255) NOT NULL,
  faculty VARCHAR(255) NOT NULL,
  major VARCHAR(255) NOT NULL,
  admission_path VARCHAR(50) NOT NULL,
  current_semester INT DEFAULT 1,
  cumulative_gpa NUMERIC(3,2) NOT NULL,
  ukt_tier VARCHAR(100),
  ukt_fee BIGINT DEFAULT 0,
  scholarship_status VARCHAR(100) DEFAULT 'Non-Beasiswa',
  status VARCHAR(100) DEFAULT 'Aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Linimasa Perjalanan Mahasiswa
CREATE TABLE alumni_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alumni_id UUID REFERENCES alumni(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date VARCHAR(100) NOT NULL,
  semester INT,
  description TEXT,
  gpa NUMERIC(3,2),
  highlight_badge VARCHAR(100),
  institution VARCHAR(255),
  status_type VARCHAR(50) DEFAULT 'info',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
