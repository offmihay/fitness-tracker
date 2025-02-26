import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, { FadeIn, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "@/src/shared/text/CustomText";

type Props = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  onClear?: () => void;
  useClearButton?: boolean;
};

const FilterItem = ({ label, isSelected, onPress, onClear, useClearButton }: Props) => {
  const theme = useCustomTheme();

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isSelected ? theme.colors.primary : theme.colors.surface, {
      duration: 150,
    }),
  }));

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Animated.View
        style={[
          styles.filterItem,
          {
            paddingRight: isSelected && useClearButton ? 40 : 18,
          },
          animatedWrapperStyle,
        ]}
      >
        <CustomText color={isSelected ? "white" : theme.colors.text}>{label}</CustomText>

        {useClearButton && (
          <View style={styles.icon}>
            {isSelected && (
              <Animated.View style={StyleSheet.absoluteFill} entering={FadeIn}>
                <TouchableOpacity
                  onPress={onClear}
                  style={StyleSheet.absoluteFill}
                  className="justify-center items-center"
                >
                  <AntDesign name="closecircle" color="white" style={{ opacity: 0.8 }} size={14} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterItem: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 10,
    minHeight: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },

  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilterItem;
