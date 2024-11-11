import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import TouchableBtn from "@/src/components/shared/touchable/TouchableBtn";
import { FontAwesome6 } from "@expo/vector-icons";
import ImagePickerModal from "@/src/components/shared/img-picker/ImagePickerModal";

type Props = {};

const Workouts = ({}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableBtn
        onPress={handleOpenModal}
        className="mt-6"
        nodeLeft={(color) => <FontAwesome6 name="image" size={24} color={color} />}
        title={"camera"}
      />
      {/* <ImagePickerModal modalVisible={isModalVisible} setModalVisible={setModalVisible} /> */}
    </View>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
  },
});
