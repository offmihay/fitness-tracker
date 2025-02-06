import { Link, router, Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../shared/text/CustomText";
import { Pressable } from "react-native-gesture-handler";

export default function NotFoundScreen() {
  const pathname = usePathname();

  const handlePress = () => {
    router.push({
      pathname: "/",
    });
  };
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <CustomText style={styles.title}>404 - Page Not Found</CustomText>
        <CustomText style={styles.subtitle}>You tried to visit: {pathname}</CustomText>

        <Pressable onPress={handlePress}>
          <CustomText type="link">Go to home screen!</CustomText>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
