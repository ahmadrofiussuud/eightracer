import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eightracer - High School Student & Alumni Tracker",
  description:
    "Sistem pelacakan dan evaluasi capaian siswa SMAN 8 Jakarta dari seleksi perguruan tinggi negeri hingga progres beasiswa KIP-Kuliah dan IPK universitas.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full bg-slate-50 antialiased">
      <body className="h-full min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
