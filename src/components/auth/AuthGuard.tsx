import { Slot, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

type Props = {
  onReady?: () => void;
};

const AuthGuard = ({ onReady, children }: PropsWithChildren<Props>) => {
  const { navigate } = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  const [isReady, setIsReady] = useState(false);

  const { data } = useQuery({
    queryKey: ["wizard-seen"],
    queryFn: async () => {
      const isWizardSeen = await AsyncStorage.getItem("wizardSeen");
      return {
        isWizardSeen: isWizardSeen === "true",
      };
    },
  });

  useEffect(() => {
    if (!data || !isLoaded) return;

    if (!data.isWizardSeen) {
      navigate("/wizard");
    } else {
      if (!!isSignedIn) {
        navigate("/home");
      } else {
        navigate("/welcome");
      }
    }

    setIsReady(true);
    onReady?.();
  }, [data, isLoaded, isSignedIn]);

  if (!isReady) {
    return <Slot />;
  }

  return children;
};

export default AuthGuard;
