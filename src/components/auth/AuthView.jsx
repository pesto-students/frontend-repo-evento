"use client";

import React, { useState } from "react";
import UserLoginForm from "@/components/auth/UserLoginForm";
import ManagerLoginForm from "@/components/auth/ManagerLoginForm";

const AuthView = () => {
  const [currentView, setCurrentView] = useState("MANAGER");
  return (
    <div className="w-full flex justify-center">
      {currentView === "user" ? (
        <UserLoginForm setCurrentView={setCurrentView} />
      ) : (
        <ManagerLoginForm setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default AuthView;
