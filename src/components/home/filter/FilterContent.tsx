import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../../shared/text/CustomText";
import { TournamentSkillLevel, TournamentSportType } from "@/src/types/TournamentType";
import { Divider } from "react-native-paper";
import ButtonDefault from "../../shared/button/ButtonDefault";
import FilterItem from "./FilterItem";
import DatePickerInput from "../../shared/input/DatePickerInput";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomTextInput from "../../shared/input/CustomTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardProvider, KeyboardStickyView } from "react-native-keyboard-controller";
import { hexToRgba } from "@/src/utils/hexToRgba";

type FilterGroup = {
  sportType: TournamentSportType[];
  skillLevel: TournamentSkillLevel[];
};

type FilterSingle = {
  date: Date | string;
};

const ModalContent = () => {
  const theme = useCustomTheme();
  const [filterGroup, setFilterGroup] = useState<FilterGroup>({ sportType: [], skillLevel: [] });
  const [filterSingle, setFilterSingle] = useState<FilterSingle>({ date: "" });

  const handleChangeFilterGroup = <T extends keyof FilterGroup>(
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

  const handleChangeFilterGroupSingle = <T extends keyof FilterSingle>(
    filterType: T,
    filterValue: FilterSingle[T]
  ) => {
    setFilterSingle((prev) => ({ ...prev, [filterType]: filterValue }));
  };

  return (
    <>
      <View style={styles.modalWrapper}>
        <KeyboardAwareScrollView
          extraScrollHeight={0}
          enableOnAndroid={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        >
          <View className="flex flex-col gap-6">
            <View>
              <CustomText type="subtitle">Sport type</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Badminton"
                  onPress={() => handleChangeFilterGroup("sportType", "badminton")}
                  isSelected={filterGroup.sportType.includes("badminton")}
                />
                <FilterItem
                  label="Squash"
                  onPress={() => handleChangeFilterGroup("sportType", "squash")}
                  isSelected={filterGroup.sportType.includes("squash")}
                />
                <FilterItem
                  label="Tennis"
                  onPress={() => handleChangeFilterGroup("sportType", "tennis")}
                  isSelected={filterGroup.sportType.includes("tennis")}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">PrizePool</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <View className="w-1/2 pr-2">
                  <CustomTextInput label="From" keyboardType="number-pad" />
                </View>
                <View className="w-1/2 pl-2">
                  <CustomTextInput label="To" keyboardType="number-pad" />
                </View>
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">Skill Level</CustomText>
              <View style={styles.filterWrapperGroup} className="mt-4">
                <FilterItem
                  label="Amateur"
                  onPress={() => handleChangeFilterGroup("skillLevel", "amateur")}
                  isSelected={filterGroup.skillLevel.includes("amateur")}
                />
                <FilterItem
                  label="Beginner"
                  onPress={() => handleChangeFilterGroup("skillLevel", "beginner")}
                  isSelected={filterGroup.skillLevel.includes("beginner")}
                />
                <FilterItem
                  label="Professional"
                  onPress={() => handleChangeFilterGroup("skillLevel", "professional")}
                  isSelected={filterGroup.skillLevel.includes("professional")}
                />
              </View>
            </View>
            <Divider />
            <View>
              <CustomText type="subtitle">Date</CustomText>
              <View style={styles.filterWrapperSingle} className="mt-4">
                <DatePickerInput
                  value={filterSingle.date}
                  onChange={(value) => handleChangeFilterGroupSingle("date", value)}
                  selectedDate={filterSingle.date ? new Date(filterSingle.date) : new Date()}
                  minimumDate={new Date()}
                  renderTrigger={({ onPress, value }) => (
                    <FilterItem
                      onPress={onPress}
                      label={value || "Choose date.."}
                      isSelected={!!value}
                      onClear={() => handleChangeFilterGroupSingle("date", "")}
                      useClearButton
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <StickyFooter />
      </View>
    </>
  );
};

const StickyFooter = () => {
  const offset = { closed: 0, opened: 30 };
  const theme = useCustomTheme();
  const backgroundColorWithOpacity = hexToRgba(theme.colors.background, 1);
  return (
    <KeyboardProvider>
      <KeyboardStickyView offset={offset} style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={[styles.bottomWrapper, { backgroundColor: backgroundColorWithOpacity }]}>
          <ButtonDefault title="Show results" />
        </View>
      </KeyboardStickyView>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    position: "relative",
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

  bottomWrapper: {
    paddingTop: 20,
    paddingBottom: 50,
    // borderRadius: 20,
  },
});

export default ModalContent;
