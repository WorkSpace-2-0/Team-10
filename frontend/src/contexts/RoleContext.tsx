"use client";
import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext<any>(null);

interface RoleProviderProps {
  children: React.ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [isIndividual, setIsIndividual] = useState(true);

  return (
    <RoleContext.Provider value={{ isIndividual, setIsIndividual }}>
      {children}
    </RoleContext.Provider>
  );
};
export const useRole = () => {
  useContext(RoleContext);
};
