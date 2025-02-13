import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import CustomText from "@/src/shared/text/CustomText";
import { View, StyleSheet } from "react-native";

type InfoBlockProps = {
  children: React.ReactNode;
  title?: string;
};

export const TournamentInfoBlock = ({ children, title }: InfoBlockProps) => {
  const theme = useCustomTheme();
  return (
    <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
      {title && (
        <CustomText type="subtitle" className="mb-4">
          {title}
        </CustomText>
      )}
      <View style={styles.infoBlockContainer}>{children}</View>
    </View>
  );
};

type InfoRowProps = {
  label: string;
  value: string;
  renderIcon: (color: string) => React.ReactNode;
};

export const TournamentInfoRow = ({ renderIcon, label, value }: InfoRowProps) => {
  const theme = useCustomTheme();
  const color = theme.colors.primary;
  return (
    <View style={styles.infoRowContainer}>
      <View style={styles.iconWrapper}>{renderIcon(color)}</View>
      <CustomText style={{ flex: 1 }}>
        <CustomText weight="bold">{label}: </CustomText>
        {value}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlockContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  infoRowContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  imgWrapper: {
    width: 80,
    borderRadius: 5,
    height: 60,
    overflow: "hidden",
    position: "relative",
  },

  container: {
    display: "flex",
    gap: 10,
  },

  infoBlock: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  iconWrapper: {
    width: 25,
    height: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
