import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";
import AppLayout from "@/layouts/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evento",
  description: "Explore nearby events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={clsx(inter.className, "text-[14px]")}>
        <NextTopLoader color="#DC2626" showSpinner={false} />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}