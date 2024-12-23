import { Navbar } from "@/components";
import { cn } from "@/helpers/cn";
import { getSession } from "@/helpers/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Best Nintendo 64 fan website",
  description: "Curso completo de NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();
  return (
    <html lang="en">
      <body className={cn("bg-slate-890 text-slate-300", inter.className)}>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
