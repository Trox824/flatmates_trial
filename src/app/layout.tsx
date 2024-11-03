"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar";
import { Providers } from "./providers";
import Footer from "./_components/footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Providers>
            <Navbar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Footer />
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
