import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
    </div>
  );
}