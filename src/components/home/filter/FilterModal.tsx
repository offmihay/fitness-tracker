import { useMemo } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import FilterContent from "./FilterContent";
import { Platform } from "react-native";
import ButtonFilter from "@/src/shared/button/ButtonFilter";
import ModalTrigger from "@/src/shared/modal/utils/ModalTrigger";

const FilterModal = () => {
  const snapPoints = useMemo(() => ["90%"], []);

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
        />
      )}
      modalContent={<FilterContent />}
      bottomSheetProps={{
        snapPoints,
        enableContentPanningGesture: Platform.OS === "android" ? false : true,
      }}
    />
  );
};

export default FilterModal;
