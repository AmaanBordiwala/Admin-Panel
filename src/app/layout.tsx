import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import SessionWrapper from "../components/SessionWrapper";
import ToastProvider from "../components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "A Next.js admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <SessionWrapper>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
