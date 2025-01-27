import { useEffect, useMemo, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import FilterContent from "./FilterContent";
import { Platform } from "react-native";
import ButtonFilter from "@/src/shared/button/ButtonFilter";
import ModalTrigger from "@/src/shared/modal/utils/ModalTrigger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import _ from "lodash";
import { FilterHome } from "./types";

type Props = { isMutated: boolean } & React.ComponentProps<typeof FilterContent>;

const FilterModal = (props: Props) => {
  const { isMutated } = props;
  const snapPoints = useMemo(() => ["90%"], []);
  const theme = useCustomTheme();

  return (
    <ModalTrigger
      name="filter-modal"
      renderTrigger={(handleOpen) => (
        <ButtonFilter
          label="Filter"
          renderIcon={(color, size) => (
            <FontAwesome6 name="sliders" size={size - 2} color={color} />
          )}
          onPress={handleOpen}
          style={{ backgroundColor: isMutated ? theme.colors.primary : theme.colors.surface }}
          textColor={isMutated ? "white" : theme.colors.text}
        />
      )}
      modalContent={<FilterContent {...props} />}
      bottomSheetProps={{
        snapPoints,
        enableContentPanningGesture: Platform.OS === "android" ? false : true,
      }}
    />
  );
};

export default FilterModal;
