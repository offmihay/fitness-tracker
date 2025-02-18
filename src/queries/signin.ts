import { useSignIn } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

type SignInParams = {
  emailAddress: string;
  password: string;
};

export const useSignInMutation = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const signInMutation = useMutation({
    mutationFn: async ({ emailAddress, password }: SignInParams) => {
      if (isLoaded) {
        const signInAttempt = await signIn.create({
          identifier: emailAddress,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
        }
      }
    },
    meta: {
      disableGlobalErrorHandler: true,
    },
  });

  return { signInMutation };
};
