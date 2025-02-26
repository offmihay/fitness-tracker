import { useIsMutating } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  manualOverride: boolean;
  setManualOverride: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoadingState] = useState(false);
  const [manualOverride, setManualOverrideState] = useState(false);

  const isMutating = useIsMutating();

  useEffect(() => {
    if (!manualOverride) {
      setIsLoadingState(isMutating > 0);
    }
  }, [isMutating, manualOverride]);

  const setIsLoading = (value: boolean) => {
    if (manualOverride) {
      setIsLoadingState(value);
    }
  };

  const setManualOverride = (value: boolean) => {
    setManualOverrideState(value);
    if (!value) {
      setIsLoadingState(isMutating > 0);
    } else {
      setIsLoadingState(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, manualOverride, setManualOverride }}>
      {children}
    </LoadingContext.Provider>
  );
};
