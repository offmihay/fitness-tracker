import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext } from "react";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes("Clerk has been loaded with development keys")) {
      originalWarn(...args);
    }
  };
}

const AuthContext = createContext<{
  isLoading: boolean;
  isSignedIn: boolean;
  isWizardSeen: boolean;
} | null>(null);

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuthContext must be wrapped in a <AuthContextProvider />");
    }
  }

  return value!;
}

export function AuthContextProvider({ children }: PropsWithChildren) {
  const { isLoaded, isSignedIn } = useAuth();

  const { data: wizardData, isLoading: isWizardLoading } = useQuery({
    queryKey: ["is-wizard-seen"],
    queryFn: async () => {
      const item = await AsyncStorage.getItem("wizardSeen");
      return {
        isWizardSeen: item === "true",
      };
    },
  });

  const isLoading = !isLoaded || isWizardLoading || typeof isSignedIn !== "boolean";

  const value = {
    isLoading,
    isSignedIn: !!isSignedIn,
    isWizardSeen: !!wizardData?.isWizardSeen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
