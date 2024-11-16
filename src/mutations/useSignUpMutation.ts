import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

// Hook for initial email sign-up
export const useSignUpMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  const signUpMutation = useMutation({
    mutationFn: (emailAddress: string) =>
      isLoaded
        ? signUp.create({
            emailAddress,
          })
        : Promise.resolve(undefined),
  });

  return signUpMutation;
};

// Hook for password creation during sign-up
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
        return (
          signUpResponse &&
          (await signUp.prepareEmailAddressVerification({ strategy: "email_code" }))
        );
      } else {
        return Promise.resolve(undefined);
      }
    },
  });

  return signUpPasswordMutation;
};

// Hook for resending verification code
export const useResendVerificationCodeMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  return useMutation({
    mutationFn: () =>
      isLoaded
        ? signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        : Promise.resolve(undefined),
  });
};

// Hook for verifying email code and completing sign-up
export const useVerifyEmailCodeMutation = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return useMutation({
    mutationFn: async (code: string) => {
      if (!isLoaded) {
        return Promise.resolve(undefined);
      }
      await signUp.attemptEmailAddressVerification({ code });
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
      }
    },
  });
};
