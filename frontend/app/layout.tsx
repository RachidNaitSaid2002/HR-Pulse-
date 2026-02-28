import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/toast";
import { ToastContainer } from "./components/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Pulse | AI-Powered Salary Prediction",
  description: "Make data-driven hiring decisions with AI-powered salary predictions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased grainy bg-grid-pattern`} suppressHydrationWarning>
        <ToastProvider>
          <main>{children}</main>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
