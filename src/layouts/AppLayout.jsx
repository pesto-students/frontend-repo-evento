"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/others/spinner";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const session = useSession();

  // Where we don't want to show the user layout
  const excludedPaths = ["/login", "/signup", "/manager", "/admin"];
  const protectedPaths = ["/manager", "/admin"];

  if (excludedPaths.includesOneOf(pathname)) {
    if (protectedPaths.includesOneOf(pathname)) {
      if (session?.status === "loading") {
        return <Spinner />;
      }
      if (session?.status === "authenticated") {
        return <>{children}</>;
      }
    }
    return <>{children}</>;
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
