"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { usePathname } from "next/navigation";
import React from "react";
import { authRoutes } from "@/routes";
import { useSession } from "next-auth/react";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);

  // Login, Register
  if (isAuthRoute) {
    return <> {children}</>;
  }

  // Manager Layout
  if (session?.user?.role === "MANAGER") {
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
