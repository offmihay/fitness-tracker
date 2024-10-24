import { Appearance, StyleSheet, View } from "react-native";
import React from "react";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomListItem from "../../components/list/CustomListItem";
import CustomListSection from "../../components/list/CustomListSection";
import DropdownCheckbox, { DropdownItem } from "../../components/dropdown/DropdownCheckbox";
import { useSettings } from "../../context/SettingsContext";

const settingsList = [
  {
    title: "Особисті дані",
    key: "personal-info",
    icon: AntDesign,
    iconName: "user",
    nodeContent: <View style={{ backgroundColor: "black", width: 100 }}></View>,
    noRightChevron: true,
  },
  {
    title: "Налаштувати тему",
    key: "customize-theme",
    icon: MaterialCommunityIcons,
    iconName: "theme-light-dark",
  },
  {
    title: "Змінити мову",
    key: "change-language",
    icon: Entypo,
    iconName: "language",
  },
];

type Props = {};

const settings = ({}: Props) => {
  const { settings, updateSettings } = useSettings();

  const dropdowns = {
    "customize-theme": [
      {
        key: "system",
        title: "Тема пристрою",
        isSelected: !settings.theme,
        onPress: () => updateSettings({ theme: null }),
      },
      {
        key: "dark",
        title: "Темна тема",
        isSelected: settings.theme === "dark",
        onPress: () => updateSettings({ theme: "dark" }),
      },
      {
        key: "light",
        title: "Світла тема",
        isSelected: settings.theme === "light",
        onPress: () => updateSettings({ theme: "light" }),
      },
    ] as DropdownItem[],
  };

  return (
    <View style={styles.wrapper}>
      <CustomListSection>
        {settingsList.map((item, index) => {
          const listItem = (
            <CustomListItem
              key={`list-${item.key}`}
              title={item.title}
              icon={item.icon}
              iconName={item.iconName}
              isLast={settingsList.length - 1 === index}
              nodeContent={item.nodeContent}
              noRightChevron={item.noRightChevron}
            />
          );

          const dropdown = Object.keys(dropdowns).find(
            (dropdown) => dropdown === item.key
          ) as keyof typeof dropdowns;

          if (!dropdown) {
            return listItem;
          } else {
            return (
              <DropdownCheckbox items={dropdowns[dropdown]} key={`dropdown-${item.key}`}>
                {listItem}
              </DropdownCheckbox>
            );
          }
        })}
      </CustomListSection>
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
