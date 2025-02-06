import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomIcon from "../../../shared/icon/CustomIcon";
import { Feather } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";

type Props = {
  label: string;
  value?: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  renderButton?: () => React.ReactNode;
};

const PersonalInfoList = (props: Props) => {
  const { icon, label, value, onPress, disabled, renderButton } = props;

  const DefaultButton = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={disabled ? 1 : 0.3} disabled={disabled}>
      <View style={styles.btnWrapper}>
        <CustomIcon
          render={(color) => (
            <Feather name="edit" size={24} color={color} style={{ opacity: disabled ? 0.3 : 1 }} />
          )}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftSide}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.textContainer}>
          <CustomText type="predefault" style={{ opacity: 0.8 }}>
            {label}
          </CustomText>
          {value && (
            <CustomText
              className="mt-1"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ marginTop: 4 }}
            >
              {value}
            </CustomText>
          )}
        </View>
      </View>

      {renderButton ? renderButton() : <DefaultButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 70,
    paddingHorizontal: 20,
  },
  leftSide: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  btnWrapper: {
    justifyContent: "center",
  },
  icon: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
});

export default PersonalInfoList;
