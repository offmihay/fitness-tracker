import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

export const usePrepareForRecover = () => {
  const { signIn, isLoaded } = useSignIn();

  const mutation = useMutation({
    mutationFn: async (emailAddress: string) => {
      if (isLoaded) {
        const signInAttempt = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: emailAddress,
        });
        if (signInAttempt.status !== "needs_first_factor") {
          throw new Error("Try again", { cause: "recover_email_error" });
        }
        return signInAttempt;
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return mutation;
};

export const useResendCodeForRecover = () => {
  const { signIn, isLoaded } = useSignIn();

  const mutation = useMutation({
    mutationFn: async () => {
      if (isLoaded) {
        const emailAddressId = signIn.supportedFirstFactors?.find(
          (factor) => factor.strategy === "reset_password_email_code"
        )?.emailAddressId;
        if (!emailAddressId) {
          throw new Error("Email address should be provide again", {
            cause: "recover_resend_code_error",
          });
        }
        const signInAttempt = await signIn.prepareFirstFactor({
          strategy: "reset_password_email_code",
          emailAddressId,
        });
        if (signInAttempt.status !== "needs_first_factor") {
          throw new Error("Try again", { cause: "recover_resend_code_error" });
        }
        return signInAttempt;
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return mutation;
};

export const useVerifyCodeForRecover = () => {
  const { signIn, isLoaded } = useSignIn();

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      if (isLoaded) {
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
        });
        if (signInAttempt.status !== "needs_new_password") {
          throw new Error("Try again", { cause: "recover_verify_code_error" });
        }
        return signInAttempt;
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return mutation;
};

export const useChangePasswordForRecover = () => {
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();

  const mutation = useMutation({
    mutationFn: async (password: string) => {
      if (isLoaded) {
        const signInAttempt = await signIn.resetPassword({ password });
        if (signInAttempt.status !== "complete") {
          throw new Error("Try again", { cause: "recover_change_password_error" });
        }
        await signOut();
        return signInAttempt;
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return mutation;
};
