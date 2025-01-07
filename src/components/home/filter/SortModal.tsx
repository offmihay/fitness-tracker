import { StyleSheet, View } from "react-native";
import React from "react";
import ModalTrigger from "../../shared/modal/ModalTrigger";
import ButtonFilter from "../../shared/button/ButtonFilter";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../shared/text/CustomText";

type Props = {};

const SortModal = (props: Props) => {
  const {} = props;

  return (
    <ModalTrigger
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
          <CustomText color="white">location</CustomText>
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
