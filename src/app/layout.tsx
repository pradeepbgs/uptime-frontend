import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

        
import Navbar from "@/components/Navbar";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "uptime.bot",
  description: "uptime.bot a server monitoring service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>

          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
