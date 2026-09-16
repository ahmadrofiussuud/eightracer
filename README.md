# Eightracer 🎓
**Sistem Pelacakan Siswa & Capaian Alumni SMAN 8 Jakarta**

Eightracer adalah aplikasi manajemen sekolah dan pelacakan akademik terintegrasi yang dirancang untuk memantau perjalanan siswa SMAN 8 Jakarta dari masa penerimaan SMA, asesmen minat bakat, penentuan eligibilitas kuota SNBP, hingga rekam jejak perkuliahan, pembiayaan UKT, dan beasiswa KIP-Kuliah di perguruan tinggi negeri.

---

## 👥 Struktur Peran & Hak Akses (Role-Based Access)

Sistem Eightracer memiliki 3 tingkatan akses sesuai spesifikasi PRD:

1. **Publik (Landing Page)**:
   - Akses publik di `/` yang memuat pengenalan sistem, showcase fitur linimasa & analitik beasiswa, serta tombol CTA masuk ke portal.
2. **Admin Sekolah (`/admin/*`)**:
   - Beranda ringkasan agregat murid, eligibilitas, dan tracer study.
   - Kelola Profil Admin.
   - Data Murid (Biodata, Latar Belakang Ekonomi, Asesmen Karakteristik).
   - Penentuan Eligibilitas (Input Data Pendukung, Kriteria & Cek Status).
   - Alumni ke PT / Study Tracer (Input & Kelola, List Alumni, Progress PT).
   - **Fitur Unggulan Tim**:
     - *Timeline Individu* (`/admin/alumni-beasiswa/timeline`)
     - *Analitik Beasiswa* (`/admin/alumni-beasiswa/analitik`)
3. **Siswa & Calon Alumni (`/student/*`)**:
   - Portal mandiri read-only & self-service untuk mengecek status eligibilitas SNBP kuota 40%, riwayat asesmen RIASEC, serta direktori dan progres alumni di PTN.

---

## 🌟 Fitur Unggulan (Flagship Features)

1. **Analitik Beasiswa (`/admin/alumni-beasiswa/analitik`)**:
   - **Pertumbuhan KIP-Kuliah per Tahun (2020 - 2024)**: Diagram gabungan batang & garis (*ComposedChart*) tren penerima beasiswa KIP-K vs mahasiswa reguler dan rata-rata IPK.
   - **Korelasi Nilai Rapor SMA vs Beasiswa**: Analisis hubungan antara nilai rapor SMA dengan keberhasilan meraih beasiswa dan capaian IPK universitas.
   - **Distribusi Biaya Kuliah (UKT)**: Visualisasi kelompok UKT Golongan 1 s.d. 6+.
   - **Kartu Metrik KPI**: Total dana subsidi UKT terserap, retensi IPK > 3.50, dan perguruan tinggi tujuan utama.

2. **Timeline Individu / Linimasa (`/admin/alumni-beasiswa/timeline`)**:
   - **Pemilih Profil Siswa**: Penggantian instan antar profil alumni.
   - **Linimasa Vertikal Kronologis**: Menghubungkan seluruh simpul perjalanan: PPDB SMA, prestasi OSN, kelulusan SNBP, penetapan beasiswa KIP-K, Dean's List per semester, asisten laboratorium, hingga magang MSIB.
   - **Panel Analitik Samping**: Grafik tren IPK per semester (IPS), status pencairan dana KIP-K, dan catatan komunikasi guru BP/BK.

---

## 💻 Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Lingkungan (Opsional)
Salin `.env.example` menjadi `.env.local` untuk menghubungkan ke instance Supabase:
```bash
cp .env.example .env.local
```
Isi konfigurasi Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
*(Catatan: Aplikasi dilengkapi fallback data cerdas di `src/data/mockData.ts` sehingga dapat langsung dijalankan tanpa database online).*

### 3. Menjalankan Server Lokal
```bash
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

### 4. Build Produksi
```bash
npm run build
npm run start
```

---

## 🗄️ Skema Database Supabase Resmi (PRD Schema)

Berikut adalah skema tabel resmi PostgreSQL/Supabase yang aman untuk dijalankan pada SQL Editor:

```sql
-- Pastikan ekstensi UUID aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Domain Biodata Murid (Tabel Induk)
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nisn VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(100),
  current_class VARCHAR(50),
  social_aid_status VARCHAR(50), -- PIP, PKH, KIS, dll
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Domain Asesmen Karakteristik
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  learning_style VARCHAR(100),
  personality_type VARCHAR(100), -- Melankolis, Plegmatis, dll
  riasec_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Domain Penentuan Eligibilitas
CREATE TABLE IF NOT EXISTS eligibility (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  avg_rapor_score DECIMAL(5,2),
  tka_score DECIMAL(5,2),
  is_eligible BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Domain Data Alumni ke Perguruan Tinggi (Masuk PT)
CREATE TABLE IF NOT EXISTS alumni_admissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  university_name VARCHAR(255),
  study_program VARCHAR(255),
  admission_path VARCHAR(100), -- SNBP, SNBT, Mandiri, dll
  is_kipk_applicant BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Domain Data Alumni di Perguruan Tinggi (Fitur Unggulan B4)
CREATE TABLE IF NOT EXISTS alumni_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  university_name VARCHAR(255),
  current_semester INT,
  gpa DECIMAL(3,2), -- IPK
  is_kipk_receiver BOOLEAN DEFAULT false,
  other_scholarships TEXT,
  ukt_amount DECIMAL(15,2),
  timeline_status VARCHAR(255), -- "Diterima", "Lulus Semester 1", "Menerima Beasiswa"
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
