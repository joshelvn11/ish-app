import React, { createContext, useState, useEffect } from "react";

const UiContext = React.createContext();

export default UiContext;

export const UiContextProvider = ({ children }) => {
  let [navbarOpen, setNavbarOpen] = useState(false);

  let contextData = {
    navbarOpen: navbarOpen,
    setNavbarOpen,
    setNavbarOpen,
  };

  useEffect(() => {
    // Set the inital value based on the screen size on initial render
    setNavbarOpen(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    console.log(`Navbar open = ${navbarOpen}`);
  }, [navbarOpen]);

  return (
    <UiContext.Provider value={contextData}>{children}</UiContext.Provider>
  );
};
