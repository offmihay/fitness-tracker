import { Slot, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

const AuthGuard = () => {
  const { navigate } = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    console.log("isSignedIn: ", isSignedIn);
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Slot />;
};

export default AuthGuard;
