import { View, StyleSheet } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabbarWrapper}>
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
            style={styles.tabbarItem}
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
    backgroundColor: "#323232",
    bottom: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 50,
    borderRadius: 60,
  },

  tabbarItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 2,
  },
});

export default CustomTabBar;
