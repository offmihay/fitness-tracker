import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

type Props = { dir: "right" | "left"; onPress: () => void; isDisabled?: boolean };
const CustomArrow = ({ dir, onPress, isDisabled }: Props) => {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: dir === "right" ? "flex-end" : "flex-start",
      }}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          opacity: isDisabled ? 0 : 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          borderRadius: 100,
          left: dir === "right" ? undefined : 10,
          right: dir === "left" ? undefined : 10,
        }}
      >
        <AntDesign
          name={dir === "right" ? "rightcircle" : "leftcircle"}
          size={30}
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomArrow;
