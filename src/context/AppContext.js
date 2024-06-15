"use client";

import Axios from "@/lib/Axios";

const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/auth/userInfo`);
      setUser(res.data.data);
    } catch (error) {
      console.log("ERROR-", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("accessToken").length
    ) {
      getUser();
    } else {
      setLoading(false);
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
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
