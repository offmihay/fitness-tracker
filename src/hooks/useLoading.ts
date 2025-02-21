import { useEffect, useContext } from "react";
import { LoadingContext } from "../providers/LoadingProvider";

export const useManualLoading = (override: boolean = true) => {
  const loadingContext = useContext(LoadingContext);
  if (!loadingContext) {
    throw new Error("useManualLoading should be used in LoadingProvider");
  }

  const { setManualOverride, isLoading, setIsLoading } = loadingContext;

  useEffect(() => {
    setManualOverride(override);
    return () => setManualOverride(false);
  }, [override, setManualOverride]);

  return { isLoading, setIsLoading };
};
