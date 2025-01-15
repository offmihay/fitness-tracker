import { Keyboard, Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../shared/text/CustomText";
import { Divider } from "react-native-paper";
import ButtonDefault from "../../shared/button/ButtonDefault";
import FilterItem from "./FilterItem";
import DatePickerInput from "../../shared/input/DatePickerInput";
import CustomTextInput from "../../shared/input/CustomTextInput";
import { FilterGroup, FilterSingle, FilterRange, Range, Filter } from "./types";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useScrollProps from "@/src/hooks/useScrollProps";
import { TournamentSkillLevel, TournamentSport } from "@/src/types/tournament";
import StickyFooterView from "../../shared/view/StickyFooterView";
import CustomKeyboardAwareScrollView from "../../shared/view/CustomKeyboardAwareScrollView";

const FilterContent = () => {
  const { dismiss } = useBottomSheetModal();

  const emptyFilter: Filter = {
    sportType: [],
    skillLevel: [],
    date: "",
    prizePool: {},
    entryFee: {},
  };

  const [filter, setFilter] = useState<Filter>(emptyFilter);

  const iosBottomBias = Platform.OS === "ios" ? 30 : 0;

  useEffect(() => {
    const fetchStoredFilter = async () => {
      const storedData = await AsyncStorage.getItem("filter-tournaments");
      const result = storedData ? (JSON.parse(storedData) as Filter) : null;
      return result ?? emptyFilter;
    };

    fetchStoredFilter().then((filterStorage) => {
      setFilter(filterStorage);
    });
  }, []);

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
        ) as Filter[T];
      } else {
        newFilter[filterType] = [...newFilter[filterType], filterValue] as Filter[T];
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

  const handleShowResults = async () => {
    try {
      await AsyncStorage.setItem("filter-tournaments", JSON.stringify(filter));
    } catch (e) {
      console.error("Failed to save filter settings", e);
    }
    Keyboard.dismiss();
    dismiss("filter-modal");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.modalWrapper, { paddingBottom: 70 + iosBottomBias }]}>
        <CustomKeyboardAwareScrollView useScrollHook extraScrollHeight={10}>
          <View className="flex flex-col gap-6 pb-10">
            <View>
              <CustomText type="subtitle">Sport type</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Badminton"
                  onPress={() => handleChangeGroup("sportType", TournamentSport.Badminton)}
                  isSelected={filter.sportType.includes(TournamentSport.Badminton)}
                />
                <FilterItem
                  label="Squash"
                  onPress={() => handleChangeGroup("sportType", TournamentSport.Squash)}
                  isSelected={filter.sportType.includes(TournamentSport.Squash)}
                />
                <FilterItem
                  label="Tennis"
                  onPress={() => handleChangeGroup("sportType", TournamentSport.Tennis)}
                  isSelected={filter.sportType.includes(TournamentSport.Tennis)}
                />
                <FilterItem
                  label="Table Tennis"
                  onPress={() => handleChangeGroup("sportType", TournamentSport.TableTennis)}
                  isSelected={filter.sportType.includes(TournamentSport.TableTennis)}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">Skill Level</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Amateur"
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.Amateur)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.Amateur)}
                />
                <FilterItem
                  label="Beginner"
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.Beginner)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.Beginner)}
                />
                <FilterItem
                  label="Professional"
                  onPress={() => handleChangeGroup("skillLevel", TournamentSkillLevel.Professional)}
                  isSelected={filter.skillLevel.includes(TournamentSkillLevel.Professional)}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">PrizePool</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <View className="w-1/2 pr-2">
                  <CustomTextInput
                    label="From"
                    keyboardType="number-pad"
                    value={filter.prizePool?.min?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("prizePool", "min", value)}
                    useClearButton
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label="To"
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
              <CustomText type="subtitle">Entry fee</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <View className="w-1/2 pr-2">
                  <CustomTextInput
                    label="From"
                    keyboardType="number-pad"
                    value={filter.entryFee?.min?.toString() ?? ""}
                    onChangeText={(value) => handleChangeRange("entryFee", "min", value)}
                    useClearButton
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label="To"
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
              <CustomText type="subtitle">Date</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <DatePickerInput
                  label="Date"
                  value={filter.date}
                  onChange={(value) => handleChangeSingle("date", value)}
                  selectedDate={filter.date ? new Date(filter.date) : new Date()}
                  minimumDate={new Date()}
                  renderTrigger={({ onPress, value }) => (
                    <FilterItem
                      onPress={onPress}
                      label={value || "Choose date.."}
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
          <ButtonDefault title="Show results" onPress={handleShowResults} />
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
  },
});

export default FilterContent;
