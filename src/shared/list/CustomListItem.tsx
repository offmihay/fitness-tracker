import { StyleSheet, View, ViewProps } from "react-native";
import React from "react";
import { Divider, List } from "react-native-paper";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

export type CustomListItemProps = {
  isLast?: boolean;
  nodeContentRight?: React.ReactNode;
  nodeContentLeft?: React.ReactNode;
  noRightChevron?: boolean;
  icon?: React.ElementType;
  iconStyle?: ViewProps["style"];
  iconName?: string;
  chevron?: "down" | "up" | "right" | "left";
} & React.ComponentProps<typeof List.Item>;

const CustomListItem = ({
  isLast = false,
  nodeContentRight,
  nodeContentLeft,
  noRightChevron,
  chevron = "right",
  icon: Icon,
  iconName = "home",
  iconStyle,
  ...rest
}: CustomListItemProps) => {
  const theme = useCustomTheme();

  return (
    <View className="relative">
      <List.Item
        style={{
          paddingVertical: 5,
          minHeight: 60,
          display: "flex",
          justifyContent: "center",
          paddingHorizontal: 0,
          backgroundColor: theme.colors.surface,
        }}
        titleStyle={[{ color: theme.colors.text }]}
        descriptionStyle={{ color: theme.colors.primary, top: 3 }}
        right={(props) => (
          <View style={styles.listView}>
            {nodeContentRight}
            {!noRightChevron && (
              <List.Icon
                {...props}
                icon={`chevron-${chevron}`}
                color={theme.colors.textSurface}
                style={styles.pressIcon}
              />
            )}
          </View>
        )}
        left={(props) => (
          <View>
            {nodeContentLeft}
            {Icon ? (
              <Icon
                name={iconName}
                size={24}
                color={theme.colors.primary}
                style={[props.style, iconStyle, { top: 5 }]}
              />
            ) : null}
          </View>
        )}
        {...rest}
      />
      {!isLast && (
        <Divider
          style={[
            styles.pseudoElement,
            {
              backgroundColor: theme.dark ? "rgba(191, 191, 191, 0.2)" : "rgba(191, 191, 191, 0.7)",
            },
          ]}
        />
      )}
    </View>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  pseudoElement: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 0.5,
    width: "85%",
  },

  pressIcon: {
    position: "static",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  listView: {
    left: 0,
    right: 0,
    width: 100,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
