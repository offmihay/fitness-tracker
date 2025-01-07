import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import ModalTrigger from "../../shared/modal/ModalTrigger";
import ButtonFilter from "../../shared/button/ButtonFilter";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomText from "../../shared/text/CustomText";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TournamentSkillLevel, TournamentSportType } from "@/src/types/tournamentType";
import { Divider } from "react-native-paper";

type Filter = {
  sportType: TournamentSportType[];
  skillLevel: TournamentSkillLevel[];
};

const FilterItem = ({
  label,
  isSelected,
  onToggle,
}: {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}) => {
  const theme = useCustomTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.filterItem,
        { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface },
      ]}
      onPress={onToggle}
    >
      <CustomText>{label}</CustomText>
    </TouchableOpacity>
  );
};

type Props = {};
const ModalContent = () => {
  const [filter, setFilter] = useState<Filter>({ sportType: [], skillLevel: [] });

  const handleChangeFilter = <T extends keyof Filter>(
    filterType: T,
    filterValue: Filter[T][number]
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

  const theme = useCustomTheme();
  return (
    <View style={styles.modalWrapper}>
      <View className="flex flex-col gap-6">
        <View>
          <CustomText type="subtitle">Sport type</CustomText>
          <View style={styles.filterWrapper} className="mt-4">
            <FilterItem
              label="Badminton"
              onToggle={() => handleChangeFilter("sportType", "badminton")}
              isSelected={filter.sportType.includes("badminton")}
            />
            <FilterItem
              label="Squash"
              onToggle={() => handleChangeFilter("sportType", "squash")}
              isSelected={filter.sportType.includes("squash")}
            />
            <FilterItem
              label="Tennis"
              onToggle={() => handleChangeFilter("sportType", "tennis")}
              isSelected={filter.sportType.includes("tennis")}
            />
          </View>
        </View>
        <Divider />
        <View>
          <CustomText type="subtitle">Skill Level</CustomText>
          <View style={styles.filterWrapper} className="mt-4">
            <FilterItem
              label="Amateur"
              onToggle={() => handleChangeFilter("skillLevel", "amateur")}
              isSelected={filter.skillLevel.includes("amateur")}
            />
            <FilterItem
              label="Beginner"
              onToggle={() => handleChangeFilter("skillLevel", "beginner")}
              isSelected={filter.skillLevel.includes("beginner")}
            />
            <FilterItem
              label="Professional"
              onToggle={() => handleChangeFilter("skillLevel", "professional")}
              isSelected={filter.skillLevel.includes("professional")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const FilterModal = () => {
  const snapPoints = useMemo(() => ["70%"], []);

  return (
    <>
      <ModalTrigger
        renderTrigger={(onPress) => (
          <ButtonFilter
            label="Filter"
            renderIcon={(color, size) => (
              <FontAwesome6 name="sliders" size={size - 2} color={color} />
            )}
            onPress={onPress}
          />
        )}
        modalContent={<ModalContent />}
        bottomSheetProps={{
          snapPoints,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  filterWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },

  filterItem: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 50,
  },
});

export default FilterModal;
