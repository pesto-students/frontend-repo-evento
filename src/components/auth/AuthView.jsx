"use client";

import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import ManagerLoginForm from "@/components/auth/ManagerLoginForm";

const AuthView = () => {
  const [currentView, setCurrentView] = useState("user");
  return (
    <div className="w-full flex justify-center">
      {currentView === "user" ? (
        <LoginForm setCurrentView={setCurrentView} />
      ) : (
        <ManagerLoginForm setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default AuthView;
