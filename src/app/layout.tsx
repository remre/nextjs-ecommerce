import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
// make changes
=======
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar/Navbar";

>>>>>>> cedcca0a576eb76febcdc5c49189135b91449866
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flowmazon",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="max-w-7x1 m-auto min-w-[50px] p-4 ">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
