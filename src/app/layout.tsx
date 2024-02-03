import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar/Navbar";
import logo from "@/assets/logo.png";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/first_logo_from_first_set.ico",
  title: "e-commrade",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/first_logo_from_first_set.ico" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="max-w-7x1 container mx-auto mt-20 min-h-screen min-w-[50px] items-center">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
