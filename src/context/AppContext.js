"use client";

const { createContext, useState, useContext } = require("react");

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        locationModalOpen,
        setLocationModalOpen,
        hamburgerMenuOpen,
        setHamburgerMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
