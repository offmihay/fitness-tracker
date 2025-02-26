import { StyleSheet, View } from "react-native";
import React from "react";
import CheckboxContextMenu, {
  DropdownItem,
} from "../../../../shared/context-menu/CheckboxContextMenu";
import { getDropdownItems, getSettingsList } from "../../../../components/settings/SettingsHelper";
import LayoutScrollView from "@/src/components/navigation/layouts/LayoutScrollView";
import CustomListItem from "@/src/shared/list/CustomListItem";
import CustomListSection from "@/src/shared/list/CustomListSection";

const SettingsPage = () => {
  const dropdowns = getDropdownItems();
  const settingsList = getSettingsList();

  return (
    <LayoutScrollView name="settings" alwaysBounceVertical={false} canGoBack={false}>
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
                <CheckboxContextMenu items={dropdowns[dropdown] as DropdownItem[]} key={item.key}>
                  {listItem}
                </CheckboxContextMenu>
              );
            }
          })}
        </CustomListSection>
      </View>
    </LayoutScrollView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
