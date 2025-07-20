import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "취미로운응원생활",
  description: "치어리딩, 어렵지 않고 취미롭게!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head className="bg-pink-50"></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50`}
      >
        {children}
      </body>
    </html>
  );
}

