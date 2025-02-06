import { Slot, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import CustomText from "@/src/shared/text/CustomText";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { navigate } = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      !!isSignedIn ? navigate("/home") : navigate("/welcome");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText>NOT LOADED</CustomText>
      </View>
    );
  }
  return children;
};

export default AuthGuard;
