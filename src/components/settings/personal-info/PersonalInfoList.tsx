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
    <TouchableOpacity onPress={onPress} activeOpacity={disabled ? 1 : 0.3}>
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
    <>
      <View style={styles.wrapper}>
        <View>
          <View style={styles.textWrapper}>
            {icon}
            <View>
              <CustomText type="predefault" style={{ opacity: 0.8 }}>
                {label}
              </CustomText>
              {value && <CustomText className="mt-1">{value}</CustomText>}
            </View>
          </View>
        </View>
        {renderButton ? renderButton() : <DefaultButton />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 70,
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  btnWrapper: {
    paddingRight: 20,
    width: 70,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default PersonalInfoList;
