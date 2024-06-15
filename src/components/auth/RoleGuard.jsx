"use client";

import { useAppContext } from "@/context/AppContext";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RoleGuard = ({ children, allowedRoles = ["USER"] }) => {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!allowedRoles.includes(user?.role)) {
      router.push("/");
    }
  }, [user, allowedRoles, router]);

  if (!allowedRoles.includes(user?.role)) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-screen">
        <Spin />
        <div>
          <span className="pl-2">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
