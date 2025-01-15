import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../shared/text/CustomText";
import CustomIcon from "../../shared/icon/CustomIcon";
import { Feather } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
};

const PersonalInfoList = (props: Props) => {
  const { icon, label, value, onPress, disabled } = props;

  return (
    <>
      <View style={styles.wrapper}>
        <View>
          <View style={styles.textWrapper}>
            {icon}
            <View>
              <CustomText type="predefault" style={{ opacity: 0.8 }}>
                {label}
              </CustomText>
              <CustomText className="mt-1">{value}</CustomText>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} activeOpacity={disabled ? 1 : 0.3}>
          <View style={styles.btnWrapper}>
            <CustomIcon
              render={(color) => (
                <Feather
                  name="edit"
                  size={24}
                  color={color}
                  style={{ opacity: disabled ? 0.3 : 1 }}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  btnWrapper: {
    width: 70,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PersonalInfoList;
