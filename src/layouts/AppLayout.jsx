"use client";

import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/navbar/Navbar";
import { LocationModal } from "@/components/user/LocationModal";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/others/spinner";
import { authRoutes } from "@/routes";

Array.prototype.includesOneOf = function (array) {
  return this.some((item) => array.includes(item));
};

const AppLayout = ({ children }) => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return <> {children}</>;
  }

  // Manager
  if (pathname.startsWith("/manager")) {
    if (session.status === "loading") {
      return <Spinner />;
    }
    if (session.status === "authenticated") {
      return <> {children}</>;
    }
    return router.push("/login");
  }

  // User layout
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
