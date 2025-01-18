import { StyleSheet, View } from "react-native";
import React from "react";

import DropdownCheckbox, {
  DropdownItem,
} from "../../../components/shared/dropdown/DropdownCheckbox";

import CustomListItem from "../../../components/shared/list/CustomListItem";
import CustomListSection from "../../../components/shared/list/CustomListSection";
import { getDropdownItems, getSettingsList } from "../../../components/settings/SettingsHelper";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";

type Props = {};

const settings = ({}: Props) => {
  const dropdowns = getDropdownItems();
  const settingsList = getSettingsList();

  return (
    <LayoutStatic>
      <View style={styles.wrapper}>
        <CustomListSection>
          {settingsList.map((item, index) => {
            const { key: _, ...listItemProps } = item;

            const listItem = (
              <CustomListItem
                key={`list-${item.key}`}
                isLast={settingsList.length - 1 === index}
                {...listItemProps}
              />
            );

            const dropdown = Object.keys(dropdowns).find(
              (dropdown) => dropdown === item.key
            ) as keyof typeof dropdowns;

            if (!dropdown) {
              return listItem;
            } else {
              return (
                <DropdownCheckbox items={dropdowns[dropdown] as DropdownItem[]} key={item.key}>
                  {listItem}
                </DropdownCheckbox>
              );
            }
          })}
        </CustomListSection>
      </View>
    </LayoutStatic>
  );
};

export default settings;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
