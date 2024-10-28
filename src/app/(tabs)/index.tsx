import { Image, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

import { useCustomTheme } from "../../hooks/useCustomTheme";
import CustomPicker from "../../components/shared/picker/CustomPicker";
import CustomPickerItem from "../../components/shared/picker/CustomPickerItem";
import { useAuth } from "../../hooks/useAuth";

type HomePageProps = {};

GoogleSignin.configure({
  iosClientId: "1017780084148-f9qpidfc4si6f18uum2jqbpn5ne4hkk4.apps.googleusercontent.com",
});

const HomePage = ({}: HomePageProps) => {
  const [user, setUser] = useState<User>();
  const { logIn } = useAuth();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const data = response.data;
        setUser(data);
        logIn({
          token: data.idToken,
          user: {
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.givenName,
            secondName: data.user.familyName,
            photo: data.user.photo,
            username: data.user.email,
          },
        });
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

  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const theme = useCustomTheme();

  return (
    <SafeAreaView>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />

      <CustomPicker
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue as string)}
        itemStyle={{
          width: 200,
          fontSize: 15,
          color: theme.colors.text,
        }}
      >
        <CustomPickerItem label="Java" value="java" />
        <CustomPickerItem label="JavaScript" value="js" />
        <CustomPickerItem label="JavaScript" value="js1" />
        <CustomPickerItem label="JavaScript" value="js12" />
        <CustomPickerItem label="JavaScript" value="js13" />
        <CustomPickerItem label="JavaScript" value="js14" />
        <CustomPickerItem label="JavaScript" value="js15" />
        <CustomPickerItem label="JavaScript" value="js16" />
        <CustomPickerItem label="JavaScript" value="js17" />
        <CustomPickerItem label="JavaScript" value="js18" />
        <CustomPickerItem label="JavaScript" value="js19" />
        <CustomPickerItem label="JavaScript" value="js199" />
        <CustomPickerItem label="JavaScript" value="js198" />
        <CustomPickerItem label="JavaScript" value="js871" />
        <CustomPickerItem label="JavaScript" value="js163" />
      </CustomPicker>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
