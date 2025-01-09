import { useMemo } from "react";

import ButtonFilter from "../../shared/button/ButtonFilter";
import { FontAwesome6 } from "@expo/vector-icons";
import ModalContent from "./FilterContent";
import ModalTrigger from "../../shared/modal/utils/ModalTrigger";
import { Platform } from "react-native";

const FilterModal = () => {
  const snapPoints = useMemo(() => ["90%"], []);

  return (
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
        enableContentPanningGesture: Platform.OS === "android" ? false : true,
      }}
    />
  );
};

export default FilterModal;
