import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library App",
  description: "Manage your library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
