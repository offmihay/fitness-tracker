import React from "react";
import { useAuthContext } from "../providers/AuthContextProvider";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoading, isWizardSeen, isSignedIn } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return isSignedIn ? (
    <Redirect href="/home" />
  ) : !isWizardSeen ? (
    <Redirect href="/wizard" />
  ) : (
    <Redirect href="/welcome" />
  );
}
