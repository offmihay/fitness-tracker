import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../providers/AuthContextProvider";
import { Redirect } from "expo-router";
import LoadingModal from "../shared/modal/LoadingModal";

export default function Index() {
  const { isLoading, isWizardSeen, isSignedIn } = useAuthContext();

  if (isLoading) {
    return <LoadingModal isVisible />;
  }

  return !isWizardSeen ? (
    <Redirect href="/wizard" />
  ) : isSignedIn ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/welcome" />
  );
}
