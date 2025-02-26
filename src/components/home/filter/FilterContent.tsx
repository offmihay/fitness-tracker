import { Keyboard, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-paper";
import FilterItem from "./FilterItem";
import { FilterGroup, FilterSingle, FilterRange, Range, FilterHome } from "../types";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TournamentSkillLevel, TournamentSport } from "@/src/types/tournament";
import StickyFooterView from "../../../shared/view/StickyFooterView";
import CustomKeyboardAwareScrollView from "../../../shared/view/CustomKeyboardAwareScrollView";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import CustomTextInput from "@/src/shared/input/CustomTextInput";
import DatePickerInput from "@/src/shared/input/DatePickerInput";
import CustomText from "@/src/shared/text/CustomText";
import _ from "lodash";
import { emptyFilter } from "../storedSettings";
import { t } from "i18next";

type Props = {
  filterValues: FilterHome;
  onConfirm?: (filter: FilterHome) => void;
};

const FilterContent = (props: Props) => {
  const { onConfirm, filterValues } = props;
  const { dismiss } = useBottomSheetModal();

  const [filter, setFilter] = useState<FilterHome>(filterValues);

  const iosBottomBias = Platform.OS === "ios" ? 30 : 0;

  const handleChangeGroup = <T extends keyof FilterGroup>(
    filterType: T,
    filterValue: FilterGroup[T][number]
  ) => {
    setFilter((prev) => {
      const newFilter = { ...prev };
      const isToggled = newFilter[filterType].some((item) => item === filterValue);

      if (isToggled) {
        newFilter[filterType] = newFilter[filterType].filter(
          (item) => item !== filterValue
        ) as FilterHome[T];
      } else {
        newFilter[filterType] = [...newFilter[filterType], filterValue] as FilterHome[T];
      }
      return newFilter;
    });
  };

  const handleChangeSingle = <T extends keyof FilterSingle>(
    filterType: T,
    filterValue: FilterSingle[T]
  ) => {
    setFilter((prev) => ({ ...prev, [filterType]: filterValue }));
  };

  const handleChangeRange = (filterType: keyof FilterRange, limit: keyof Range, value: string) => {
    setFilter((prev) => {
      const newFilter = { ...prev };
      const prevLimit = newFilter[filterType];
      newFilter[filterType] = { ...prevLimit, [limit]: value === "" ? undefined : Number(value) };
      return newFilter;
    });
  };

  const handleShowResults = async (filterManual?: FilterHome) => {
    const res = filterManual || filter;
    try {
      await AsyncStorage.setItem("filter-home", JSON.stringify(res));
      filter && onConfirm?.(res);
    } catch (e) {
      throw new Error("Failed to save filter");
    }
    Keyboard.dismiss();
    dismiss("filter-modal");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.modalWrapper, { paddingBottom: 70 + iosBottomBias }]}>
        <CustomKeyboardAwareScrollView useScrollFeature extraScrollHeight={10}>
          <View className="flex flex-col gap-6 pb-10">
            <View>
              <CustomText type="subtitle">{t("tournament.sportType.title")}</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label={t("tournament.sportType.BADMINTON")}
                  onPress={() => handleChangeGroup("sportType", TournamentSport.BADMINTON)}
                  isSelected={filter.sportType.includes(TournamentSport.BADMINTON)}
                />
                <FilterItem
                  label={t("tournament.sportType.SQUASH")}
                  onPress={() => handleChangeGroup("sportType", TournamentSport.SQUASH)}
                  isSelected={filter.sportType.includes(TournamentSport.SQUASH)}
                />
                <FilterItem
                  label={t("tournament.sportType.TENNIS")}
                  onPress={() => handleChangeGroup("sportType", TournamentSport.TENNIS)}
                  isSelected={filter.sportType.includes(TournamentSport.TENNIS)}
                />
                <FilterItem
                  label={t("tournament.sportType.TABLE_TENNIS")}
                  onPress={() => handleChangeGroup("sportType", TournamentSport.TABLE_TENNIS)}
                  isSelected={filter.sportType.includes(TournamentSport.TABLE_TENNIS)}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">{t("tournament.skillLevel.title")}</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label={t("tournament.skillLevel.AMATEUR")}
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.AMATEUR)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.AMATEUR)}
                />
                <FilterItem
                  label={t("tournament.skillLevel.INTERMEDIATE")}
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.INTERMEDIATE)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.INTERMEDIATE)}
                />
                <FilterItem
                  label={t("tournament.skillLevel.PROFESSIONAL")}
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.PROFESSIONAL)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.PROFESSIONAL)}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">{t("tournament.prizePool")}</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <View className="w-1/2 pr-2">
                  <CustomTextInput
                    label={t("common.from")}
                    keyboardType="number-pad"
                    value={filter.prizePool?.min?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("prizePool", "min", value)}
                    useClearButton
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label={t("common.to")}
                    keyboardType="number-pad"
                    value={filter.prizePool?.max?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("prizePool", "max", value)}
                    useClearButton
                  />
                </View>
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">{t("tournament.entryFee")}</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <View className="w-1/2 pr-2">
                  <CustomTextInput
                    label={t("common.from")}
                    keyboardType="number-pad"
                    value={filter.entryFee?.min?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("entryFee", "min", value)}
                    useClearButton
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label={t("common.to")}
                    keyboardType="number-pad"
                    value={filter.entryFee?.max?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("entryFee", "max", value)}
                    useClearButton
                  />
                </View>
              </View>
            </View>

            <Divider />
            <View>
              <CustomText type="subtitle">{t("tournament.date")}</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <DatePickerInput
                  label={t("tournament.date")}
                  mode="date"
                  value={filter.date}
                  onChange={(value) => handleChangeSingle("date", value.toDateString())}
                  selectedDate={filter.date ? new Date(filter.date) : new Date()}
                  minimumDate={new Date()}
                  renderTrigger={({ onPress, value }) => (
                    <FilterItem
                      onPress={onPress}
                      label={value || t("common.chooseDate")}
                      isSelected={!!value}
                      onClear={() => handleChangeSingle("date", "")}
                      useClearButton
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </CustomKeyboardAwareScrollView>
      </View>

      <StickyFooterView
        wrapperStyle={{ paddingHorizontal: 20 }}
        offset={{ closed: 10 - iosBottomBias, opened: 30 }}
      >
        <View style={[styles.buttonWrapper]}>
          <View style={{ width: "70%" }}>
            <ButtonDefault
              title={t("common.showResults")}
              onPress={() => handleShowResults()}
              disabled={_.isEqual(filter, filterValues)}
            />
          </View>
          <View style={{ width: "27%" }}>
            <ButtonDefault
              title={t("common.reset")}
              type="white"
              onPress={() => {
                setFilter(emptyFilter);
                handleShowResults(emptyFilter);
              }}
              disabled={!filter || _.isEqual(JSON.parse(JSON.stringify(filter)), emptyFilter)}
            />
          </View>
        </View>
      </StickyFooterView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  filterWrapperGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },

  filterWrapperSingle: {
    display: "flex",
    flexDirection: "row",
  },

  buttonWrapper: {
    paddingTop: 15,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FilterContent;
