import { View, StyleSheet } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { BlurView } from "expo-blur";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { buildHref } = useLinkBuilder();
  const theme = useCustomTheme();

  return (
    <View
      style={[
        styles.tabbarWrapper,
        { backgroundColor: theme.colors.background, borderColor: theme.colors.surfaceLight },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        if (route.name === "index") {
          return null;
        }

        return (
          <TabBarButton
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            routeName={route.name}
            isFocused={isFocused}
            //@ts-ignore
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbarWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 50,
    borderTopWidth: 1,
  },
});

export default CustomTabBar;
