"use client";

import React, { useState } from "react";
import UserLoginForm from "@/components/Auth/UserLoginForm";
import ManagerLoginForm from "@/components/Auth/ManagerLoginForm";

const AuthView = () => {
  const [currentView, setCurrentView] = useState("user");
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
