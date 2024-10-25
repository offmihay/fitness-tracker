import { StyleSheet, View } from "react-native";
import React from "react";

import DropdownCheckbox, { DropdownItem } from "../../components/shared/dropdown/DropdownCheckbox";
import { useTranslation } from "react-i18next";
import { getDropdownItems, getSettingsList } from "../../components/settings/SettingsHelper";
import CustomListItem from "../../components/shared/list/CustomListItem";
import CustomListSection from "../../components/shared/list/CustomListSection";

type Props = {};

const settings = ({}: Props) => {
  const { t } = useTranslation();
  const dropdowns = getDropdownItems();
  const settingsList = getSettingsList();

  return (
    <View style={styles.wrapper}>
      <CustomListSection>
        {settingsList.map((item, index) => {
          const listItemProps = {
            key: `list-${item.key}`,
            isLast: settingsList.length - 1 === index,
            ...item,
          };

          const listItem = <CustomListItem {...listItemProps} />;

          const dropdown = Object.keys(dropdowns).find(
            (dropdown) => dropdown === item.key
          ) as keyof typeof dropdowns;

          if (!dropdown) {
            return listItem;
          } else {
            return (
              <DropdownCheckbox
                items={dropdowns[dropdown] as DropdownItem[]}
                key={`dropdown-${item.key}`}
              >
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
