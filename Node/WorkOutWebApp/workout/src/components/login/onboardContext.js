import React from "react";

export const OnboardContext = React.createContext();

const OnboardContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ctx = {
    isOpen: isOpen,
    setIsOpen: setIsOpen
  };

  return (
    <OnboardContext.Provider value={ctx}>{children}</OnboardContext.Provider>
  );
};

export default OnboardContextProvider;
