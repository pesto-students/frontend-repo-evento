import RoleGuard from "@/components/auth/RoleGuard";
import Header from "@/components/manager/Header";
import Sidebar from "@/components/manager/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <RoleGuard allowedRoles={["MANAGER"]}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
};

export default layout;
