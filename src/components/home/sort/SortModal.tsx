import { StyleSheet, View } from "react-native";
import React from "react";
import ButtonFilter from "@/src/shared/button/ButtonFilter";
import ModalTrigger from "@/src/shared/modal/utils/ModalTrigger";
import CustomText from "@/src/shared/text/CustomText";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const SortModal = (props: Props) => {
  const {} = props;

  return (
    <ModalTrigger
      name="sort-modal"
      renderTrigger={(onPress) => (
        <ButtonFilter
          onPress={onPress}
          label="Sort by"
          renderIcon={(color, size) => (
            <Ionicons
              name="chevron-down-outline"
              size={size}
              color={color}
              style={{ bottom: -1 }}
            />
          )}
        />
      )}
      modalContent={
        <View style={styles.modalWrapper}>
          <CustomText>location</CustomText>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default SortModal;
