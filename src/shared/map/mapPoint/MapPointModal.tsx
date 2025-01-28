import { useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import ModalController from "@/src/shared/controllers/ModalController";
import MapPointContent from "./MapPointContent";
import ButtonInput from "@/src/shared/button/ButtonInput";
import CustomIcon from "@/src/shared/icon/CustomIcon";
import CustomText from "@/src/shared/text/CustomText";

const MapPointModal = (props: React.ComponentProps<typeof MapPointContent>) => {
  const snapPoints = useMemo(() => ["70%"], []);
  return (
    <ModalController
      name="map-point-modal"
      renderTrigger={(handleOpen) => (
        <ButtonInput onPress={handleOpen}>
          <View className="flex flex-row gap-2 w-full justify-center">
            <CustomIcon
              render={(color, size) => <Feather name="map-pin" size={size} color={color} />}
            />
            <CustomText>Add geolocation</CustomText>
          </View>
        </ButtonInput>
      )}
      modalContent={<MapPointContent {...props} />}
      bottomSheetProps={{
        snapPoints,
        enableContentPanningGesture: Platform.OS === "android" ? false : true,
        // handleIndicatorStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
};

export default MapPointModal;
