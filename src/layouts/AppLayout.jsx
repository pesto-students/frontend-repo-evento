"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { LocationModal } from "@/components/others/LocationModal";
import { AppWrapper } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import React from "react";

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <AppWrapper>
      {pathname === "/login" ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          <main className="pt-[65px] pb-16 min-h-screen">{children}</main>
          <Footer />
          <LocationModal />
        </>
      )}
    </AppWrapper>
  );
};

export default AppLayout;
