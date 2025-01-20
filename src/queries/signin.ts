import { useSignIn } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

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
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
  });

  return { signInMutation };
};
