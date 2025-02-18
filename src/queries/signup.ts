import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  const signUpMutation = useMutation({
    mutationFn: async (emailAddress: string) => {
      if (isLoaded) {
        await signUp.create({
          emailAddress,
        });
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return signUpMutation;
};

type SignUpPasswordParams = {
  emailAddress: string;
  password: string;
};

export const useSignUpPasswordMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  const signUpPasswordMutation = useMutation({
    mutationFn: async ({ emailAddress, password }: SignUpPasswordParams) => {
      if (isLoaded) {
        const signUpResponse = await signUp.create({
          emailAddress,
          password,
        });

        if (signUpResponse) {
          return await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        }
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return signUpPasswordMutation;
};

export const useResendVerificationCodeMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  return useMutation({
    mutationFn: async () => {
      if (isLoaded) {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });
};

export const useVerifyEmailCodeMutation = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return useMutation({
    mutationFn: async (code: string) => {
      if (isLoaded) {
        await signUp.attemptEmailAddressVerification({ code });
        if (signUp.status === "complete") {
          await setActive({ session: signUp.createdSessionId });
        }
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });
};
