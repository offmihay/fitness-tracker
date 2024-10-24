import { StyleSheet, View } from "react-native";
import React from "react";
import { List, useTheme } from "react-native-paper";

type CustomListProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof List.Section>;

const CustomListSection = ({ children, ...rest }: CustomListProps) => {
  const theme = useTheme();
  return (
    <View style={styles.sectionWrapper}>
      <List.Section
        style={[styles.listSection, { backgroundColor: theme.colors.surface }]}
        {...rest}
      >
        {children}
      </List.Section>
    </View>
  );
};

export default CustomListSection;

const styles = StyleSheet.create({
  sectionWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  listSection: {
    marginVertical: 0,
  },
});
