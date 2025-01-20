import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs/src/types";
import CustomTabBar from "./tabBar/CustomTabBar";
import { Platform } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

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
export const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 100 : 70;

export const routeIcon: Record<string, (color: string) => React.ReactNode> = {
  home: (color: string) => <Feather name="home" size={24} color={color} style={{ bottom: 1 }} />,
  tournaments: (color: string) => <MaterialIcons name="sports-tennis" size={24} color={color} />,
  settings: (color: string) => <Feather name="settings" size={24} color={color} />,
};

export const routeNames = Object.keys(routeIcon);
