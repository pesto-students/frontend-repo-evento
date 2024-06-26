import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";
import AppLayout from "@/layouts/AppLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evento",
  description: "Explore nearby events",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="no-scrollbar">
        <body className={clsx(inter.className, "text-[14px]")}>
          <NextTopLoader color="#DC2626" showSpinner={false} />
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#ef4444",
                },
              }}
            >
              <AppProvider>
                <AppLayout>{children}</AppLayout>
                <Toaster />
              </AppProvider>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </SessionProvider>
  );
}
