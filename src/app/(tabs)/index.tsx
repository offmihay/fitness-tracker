import { Image, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";

import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

type HomePageProps = {};

GoogleSignin.configure({
  iosClientId:
    "1017780084148-f9qpidfc4si6f18uum2jqbpn5ne4hkk4.apps.googleusercontent.com",
});

const HomePage = ({}: HomePageProps) => {
  const [user, setUser] = useState<User>();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUser(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <SafeAreaView>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      {user && (
        <>
          <Text style={{ color: "white" }}>{user.user.name}</Text>
          <Text style={{ color: "white" }}>{user.user.email}</Text>
          <Text style={{ color: "white" }}>{user.user.id}</Text>
          {user.user.photo && (
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: user.user.photo }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
