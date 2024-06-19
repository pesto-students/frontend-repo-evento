"use client";

import { signOut } from "next-auth/react";

const { createContext, useState, useContext } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <AppContext.Provider
      value={{
        locationModalOpen,
        setLocationModalOpen,
        hamburgerMenuOpen,
        setHamburgerMenuOpen,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
