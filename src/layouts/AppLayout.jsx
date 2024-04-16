"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { AppWrapper } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import React from "react";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const excludedPaths = ["/login", "/manage"];
  return (
    <AppWrapper>
      {excludedPaths.includesOneOf(pathname) ? (
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
