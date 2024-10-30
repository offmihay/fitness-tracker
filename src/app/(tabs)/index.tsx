import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCustomTheme } from "../../hooks/useCustomTheme";
import CustomPicker from "../../components/shared/picker/CustomPicker";
import CustomPickerItem from "../../components/shared/picker/CustomPickerItem";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const theme = useCustomTheme();

  return (
    <SafeAreaView>
      <CustomPicker
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue as string)}
        itemStyle={{
          width: 200,
          fontSize: 15,
          color: theme.colors.text,
        }}
      >
        <CustomPickerItem label="Java" value="java" />
        <CustomPickerItem label="JavaScript" value="js" />
        <CustomPickerItem label="JavaScript" value="js1" />
        <CustomPickerItem label="JavaScript" value="js12" />
        <CustomPickerItem label="JavaScript" value="js13" />
        <CustomPickerItem label="JavaScript" value="js14" />
        <CustomPickerItem label="JavaScript" value="js15" />
        <CustomPickerItem label="JavaScript" value="js16" />
        <CustomPickerItem label="JavaScript" value="js17" />
        <CustomPickerItem label="JavaScript" value="js18" />
        <CustomPickerItem label="JavaScript" value="js19" />
        <CustomPickerItem label="JavaScript" value="js199" />
        <CustomPickerItem label="JavaScript" value="js198" />
        <CustomPickerItem label="JavaScript" value="js871" />
        <CustomPickerItem label="JavaScript" value="js163" />
      </CustomPicker>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
