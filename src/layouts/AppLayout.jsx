"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { authRoutes } from "@/routes";
import { useAppContext } from "@/context/AppContext";
import { Spin } from "antd";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAppContext();
  const isAuthRoute = authRoutes.includes(pathname);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-screen">
        <Spin />
        <div>
          <span className="pl-2">Loading...</span>
        </div>
      </div>
    );
  }

  // Login, Register
  if (isAuthRoute) {
    return <> {children}</>;
  }

  // Manager Layout
  if (user?.role === "MANAGER") {
    return <> {children}</>;
  }

  // User Layout
  return (
    <>
      <Navbar />
      <main className="pt-[65px] pb-16 min-h-screen bg-muted/50">
        {children}
      </main>
      <Footer />
      <LocationModal />
    </>
  );
};

export default AppLayout;
