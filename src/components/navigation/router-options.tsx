import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs/src/types";
import CustomTabBar from "./tabBar/CustomTabBar";
import CustomLayout, { LayoutProps } from "./CustomLayout";

const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const tabProps = {
  screenOptions: tabScreenOptions,
  // tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
};

export const stackProps = {
  screenOptions: stackScreenOptions,
};
