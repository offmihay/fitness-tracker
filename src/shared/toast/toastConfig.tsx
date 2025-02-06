import { View, Text, StyleSheet } from "react-native";
import { CombinedLightTheme } from "@/src/theme/theme";
import { AntDesign, Octicons } from "@expo/vector-icons";

type Props = {
  text: string;
};

const toastConfig = (theme: typeof CombinedLightTheme) => {
  return {
    successToast: ({ props }: { props: Props }) => (
      <View style={[styles.toastContainer]}>
        <View
          style={{
            ...styles.toast,
            backgroundColor: theme.dark ? theme.colors.surfaceLight : theme.colors.deep,
          }}
        >
          <View>
            <Octicons name="check-circle-fill" size={16} color={theme.colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.text }} numberOfLines={2}>
              {props.text}
            </Text>
          </View>
        </View>
      </View>
    ),
    errorToast: ({ props }: { props: Props }) => (
      <View style={[styles.toastContainer]}>
        <View
          style={{
            ...styles.toast,
            backgroundColor: theme.dark ? theme.colors.surfaceLight : theme.colors.deep,
          }}
        >
          <View>
            <AntDesign name="closecircle" size={18} color={theme.colors.error} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.text }} numberOfLines={2}>
              {props.text}
            </Text>
          </View>
        </View>
      </View>
    ),
  };
};

export default toastConfig;

const styles = StyleSheet.create({
  toastContainer: {
    flex: 1,
    paddingHorizontal: 40,
    width: "100%",
    zIndex: 1000,
  },
  toast: {
    height: 45,
    flex: 1,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
