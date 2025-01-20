import { View, StyleSheet, Platform } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { useTranslation } from "react-i18next";

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { buildHref } = useLinkBuilder();
  const theme = useCustomTheme();
  const { t } = useTranslation();

  const bottomGap = Platform.OS === "android" ? 5 : 30;

  return (
    <View
      style={[
        styles.tabbarWrapper,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.surfaceLight,
          paddingBottom: bottomGap,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = t(`title.${route.name}`);

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
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 50,
    borderTopWidth: 0.5,
  },
});

export default CustomTabBar;
