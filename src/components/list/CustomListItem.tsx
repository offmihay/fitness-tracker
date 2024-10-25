import { StyleSheet, View } from "react-native";
import React from "react";
import { Divider, List } from "react-native-paper";
import { useCustomTheme } from "../../hooks/useCustomTheme";

export type CustomListItemProps = {
  isLast?: boolean;
  nodeContent?: React.ReactNode;
  noRightChevron?: boolean;
  icon: React.ElementType;
  iconName: string;
  chevron?:
    | "down"
    | "up"
    | "right"
    | "left"
    | "double-down"
    | "double-up"
    | "double-right"
    | "double-left";
} & React.ComponentProps<typeof List.Item>;

const CustomListItem = ({
  isLast = false,
  nodeContent,
  noRightChevron,
  chevron = "right",
  icon: Icon,
  iconName,
  ...rest
}: CustomListItemProps) => {
  const theme = useCustomTheme();

  return (
    <View className="relative">
      <List.Item
        className="py-1"
        titleStyle={[{ color: theme.colors.text }]}
        right={(props) => (
          <View style={styles.listView}>
            {nodeContent}
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
        left={(props) => <Icon name={iconName} size={24} color={props.color} style={props.style} />}
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
  },

  listView: {
    // backgroundColor: "black",
    left: 0,
    right: 0,
    width: 100,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
