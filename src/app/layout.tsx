import type { Metadata } from "next";
import { Inter, Marcellus, Mulish } from "next/font/google";
import "./globals.css";
import "../../styles/colors.scss";
import Footer from "../../components/footer/footer";
import Link from "next/link";
import Script from "next/script";
import { CartProvider } from "./cart";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/components/Providers/user-provider";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Suspense } from "react";
import Loading from "@/components/Loading";
const marcellus = Marcellus({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={marcellus.className}>
          <UserProvider>
            <Suspense fallback={<Loading />}>
              <Header />
              <div className="flex p-4 gap-4">
                <Sidebar />
                {children}
              </div>
            </Suspense>
            <Footer />
            <Toaster position="top-right" />
          </UserProvider>
        </body>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </html>
    </CartProvider>
  );
}
