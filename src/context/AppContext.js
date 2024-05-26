"use client";

import Axios from "@/lib/Axios";

const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await Axios.get(`/auth/userInfo`);
      setUser(res.data.data);
    } catch (error) {
      console.log("ERROR-", error.message);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("accessToken").length
    ) {
      getUser();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        locationModalOpen,
        setLocationModalOpen,
        hamburgerMenuOpen,
        setHamburgerMenuOpen,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
