import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

import { Divider } from "react-native-paper";
import CustomText from "../text/CustomText";

type ModalButtonProps = {
  onPress: () => void;
  title: string;
  weight?: "normal" | "bold";
};

const ButtonAction: React.FC<ModalButtonProps> & { Group: React.FC<GroupProps> } = (props) => {
  const { onPress, title, weight = "normal" } = props;
  const theme = useCustomTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.button, { backgroundColor: theme.colors.surfaceDark }]}
      onPress={onPress}
    >
      <CustomText weight={weight} type="subtitle" styling="link">
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

type GroupProps = {
  children: React.ReactNode;
};

const Group: React.FC<GroupProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, { borderRadius: 10 }]}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider style={styles.divider} />}
          {child}
        </React.Fragment>
      ))}
    </View>
  );
};

ButtonAction.Group = Group;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    overflow: "hidden",
    backgroundColor: "black",
  },
  divider: {
    backgroundColor: "transparent",
    height: 0.5,
  },
});

export default ButtonAction;
