"use client";
import { ReactNode, useEffect } from "react";
import createcontext from "./CreateContext";
import { useEventData } from "./useEventData";
import { useEventCreation } from "./useEventCreation";
import { useUIState } from "./useUIState";
import { useAuth } from "./useAuth";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const eventData = useEventData();
  const eventCreation = useEventCreation();
  const uiState = useUIState();
  const auth = useAuth();

  return (
    <createcontext.Provider
      value={{
        ...eventData,
        ...eventCreation,
        ...uiState,
        ...auth,
      }}
    >
      {children}
    </createcontext.Provider>
  );
};

export default ContextProvider;
