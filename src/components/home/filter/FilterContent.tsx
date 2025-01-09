import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../shared/text/CustomText";
import { Divider } from "react-native-paper";
import ButtonDefault from "../../shared/button/ButtonDefault";
import FilterItem from "./FilterItem";
import DatePickerInput from "../../shared/input/DatePickerInput";
import CustomTextInput from "../../shared/input/CustomTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FilterGroup, FilterSingle, FilterRange, Range } from "../../../types/FilterType";
import FilterStickyFooter from "./FilterStickyFooter";

const FilterContent = () => {
  const [filterGroup, setFilterGroup] = useState<FilterGroup>({ sportType: [], skillLevel: [] });
  const [filterSingle, setFilterSingle] = useState<FilterSingle>({ date: "" });
  const [filterRange, setFilterRange] = useState<FilterRange>({
    prizePool: { min: undefined, max: undefined },
    entryFee: { min: undefined, max: undefined },
  });

  const handleChangeGroup = <T extends keyof FilterGroup>(
    filterType: T,
    filterValue: FilterGroup[T][number]
  ) => {
    setFilterGroup((prev) => {
      const newFilter = { ...prev };
      const isToggled = newFilter[filterType].some((item) => item === filterValue);

      if (isToggled) {
        newFilter[filterType] = newFilter[filterType].filter(
          (item) => item !== filterValue
        ) as FilterGroup[T];
      } else {
        newFilter[filterType] = [...newFilter[filterType], filterValue] as FilterGroup[T];
      }
      return newFilter;
    });
  };

  const handleChangeSingle = <T extends keyof FilterSingle>(
    filterType: T,
    filterValue: FilterSingle[T]
  ) => {
    setFilterSingle((prev) => ({ ...prev, [filterType]: filterValue }));
  };

  const handleChangeRange = (filterType: keyof FilterRange, limit: keyof Range, value: string) => {
    setFilterRange((prev) => {
      const newFilter = { ...prev };
      const prevLimit = newFilter[filterType];
      newFilter[filterType] = { ...prevLimit, [limit]: value === "" ? undefined : Number(value) };
      return newFilter;
    });
  };

  return (
    <>
      <View style={styles.modalWrapper}>
        <KeyboardAwareScrollView
          extraScrollHeight={80}
          contentContainerStyle={styles.scrollContent}
          enableOnAndroid={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-6">
            <View>
              <CustomText type="subtitle">Sport type</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Badminton"
                  onPress={() => handleChangeGroup("sportType", "badminton")}
                  isSelected={filterGroup.sportType.includes("badminton")}
                />
                <FilterItem
                  label="Squash"
                  onPress={() => handleChangeGroup("sportType", "squash")}
                  isSelected={filterGroup.sportType.includes("squash")}
                />
                <FilterItem
                  label="Tennis"
                  onPress={() => handleChangeGroup("sportType", "tennis")}
                  isSelected={filterGroup.sportType.includes("tennis")}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">Skill Level</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Amateur"
                  onPress={() => handleChangeGroup("skillLevel", "amateur")}
                  isSelected={filterGroup.skillLevel.includes("amateur")}
                />
                <FilterItem
                  label="Beginner"
                  onPress={() => handleChangeGroup("skillLevel", "beginner")}
                  isSelected={filterGroup.skillLevel.includes("beginner")}
                />
                <FilterItem
                  label="Professional"
                  onPress={() => handleChangeGroup("skillLevel", "professional")}
                  isSelected={filterGroup.skillLevel.includes("professional")}
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
                    onChangeText={(value) => handleChangeRange("prizePool", "min", value)}
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label="To"
                    keyboardType="number-pad"
                    onChangeText={(value) => handleChangeRange("prizePool", "max", value)}
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
                    onChangeText={(value) => handleChangeRange("entryFee", "min", value)}
                  />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput
                    label="To"
                    keyboardType="number-pad"
                    onChangeText={(value) => handleChangeRange("entryFee", "max", value)}
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
                  value={filterSingle.date}
                  onChange={(value) => handleChangeSingle("date", value)}
                  selectedDate={filterSingle.date ? new Date(filterSingle.date) : new Date()}
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
        </KeyboardAwareScrollView>
      </View>
      <FilterStickyFooter>
        <View style={styles.buttonWrapper}>
          <ButtonDefault
            title="Show results"
            onPress={() => console.log({ ...filterGroup, ...filterSingle, ...filterRange })}
          />
        </View>
      </FilterStickyFooter>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
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
    paddingBottom: 50,
    paddingTop: 20,
  },
});

export default FilterContent;
