import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../providers/AuthContextProvider";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoading, isWizardSeen, isSignedIn } = useAuthContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return !isWizardSeen ? (
    <Redirect href="/wizard" />
  ) : isSignedIn ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/welcome" />
  );
}
