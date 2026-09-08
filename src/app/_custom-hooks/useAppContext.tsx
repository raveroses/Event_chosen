"use client";
import { useContext } from "react";
import createcontext from "./CreateContext";
const useAppContext = () => {
  const context = useContext(createcontext);

  if (!context) {
    throw new Error(
      "useAppContext must be used within a CreateContextProvider"
    );
  }

  return context;
};

export default useAppContext;
