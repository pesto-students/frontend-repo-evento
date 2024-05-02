"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const session = useSession();

  // Where we don't want to show the user layout
  const excludedPaths = ["/login", "/manager"];

  if (excludedPaths.includesOneOf(pathname)) {
    return session?.status === "authenticated" ? (
      <>{children}</>
    ) : (
      <>Loading...</>
    );
  }

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
