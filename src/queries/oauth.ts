import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";

export const useGoogleOAuthMutation = () => {
  const { startSSOFlow } = useSSO();

  return useMutation({
    mutationFn: async () => {
      try {
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: Linking.createURL("home"),
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        } else {
          if (signIn?.status === "complete" && signUp?.status === "complete") {
            throw new Error("Failed to sign in with Google", { cause: "failed_sign_in" });
          } else if (signIn?.status === "complete") {
            throw new Error(`Need additional signUp info: ${signUp?.status}`, {
              cause: "failed_sign_in",
            });
          } else {
            throw new Error(`Need additional signIn info: ${signIn?.status}`, {
              cause: "failed_sign_in",
            });
          }
        }
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          const clerkError = error.errors[0];
          throw new Error(clerkError.message, { cause: clerkError.code });
        } else if (error instanceof Error && error.cause === "failed_sign_in") {
          throw new Error(error.message, { cause: error.cause });
        }
      }
    },
  });
};

export const useAppleOAuthMutation = () => {
  const { startSSOFlow } = useSSO();

  return useMutation({
    mutationFn: async () => {
      try {
        const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
          strategy: "oauth_apple",
          redirectUrl: Linking.createURL("home"),
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        } else {
          if (signIn?.status === "complete" && signUp?.status === "complete") {
            throw new Error("Failed to sign in with Apple", { cause: "failed_sign_in" });
          } else if (signIn?.status === "complete") {
            throw new Error(`You need provide additional signUp information: ${signUp?.status}`, {
              cause: "failed_sign_in",
            });
          } else {
            throw new Error(`You need provide additional signIn information: ${signIn?.status}`, {
              cause: "failed_sign_in",
            });
          }
        }
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          const clerkError = error.errors[0];
          throw new Error(clerkError.message, { cause: clerkError.code });
        } else if (error instanceof Error && error.cause === "failed_sign_in") {
          throw new Error(error.message, { cause: error.cause });
        }
      }
    },
  });
};
