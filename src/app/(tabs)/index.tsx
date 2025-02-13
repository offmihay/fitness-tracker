import { useAuth } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";

const MainScreen = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return <>{isLoaded && isSignedIn ? <Redirect href="/home" /> : <Redirect href="/welcome" />}</>;
};

export default MainScreen;
