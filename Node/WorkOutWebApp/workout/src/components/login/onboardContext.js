import React, { createContext } from "react";

export const OnboardContext = React.createContext();

export const OnboardContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ctx = {
    isOpen,
    setIsOpen,
  };

  return (
    <OnboardContext.Provider value={ctx}>{children}</OnboardContext.Provider>
  );
};

export default OnboardContextProvider;
