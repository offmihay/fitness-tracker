import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs/src/types";
import CustomTabBar from "./tabBar/CustomTabBar";
import { Platform } from "react-native";

const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const tabProps = {
  screenOptions: tabScreenOptions,
  tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
};

export const stackProps = {
  screenOptions: stackScreenOptions,
};

export const HEADER_MAX_HEIGHT = Platform.OS === "ios" ? 180 : 120;
export const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 130 : 70;
