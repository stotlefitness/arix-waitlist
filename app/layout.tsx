import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AriX — Coming Soon",
  description:
    "Training accountability for former college athletes. Built to recreate the structure, competition, and community you had on a team.",
  openGraph: {
    title: "AriX — Coming Soon",
    description:
      "Training accountability for former college athletes. Built to recreate the structure, competition, and community you had on a team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
