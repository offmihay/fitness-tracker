import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { TournamentRequest } from "@/src/types/tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { formatDateRange } from "@/src/utils/formatDateRange";
import { useSettings } from "@/src/hooks/useSettings";
import { formatDateTime } from "@/src/utils/formatDateTime";

type Props = {
  data: TournamentRequest;
  onCardPress?: () => void;
};

export const UserTournamentCard_HEIGHT = 170;

const UserTournamentCard = (props: Props) => {
  const { data, onCardPress } = props;
  const theme = useCustomTheme();
  const { settings } = useSettings();

  return (
    <TouchableOpacity onPress={onCardPress} activeOpacity={0.8}>
      <View style={[styles.wrapper, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <View className="flex flex-row gap-2 items-center">
              <FontAwesome name="circle" size={10} color={theme.colors.success} />
              <CustomText type="small">Ongoing</CustomText>
            </View>
            <View className="flex flex-row items-center">
              <CustomText type="small">
                {formatDateTime(data.createdAt, settings.language)}
              </CustomText>
            </View>
          </View>
          <Divider />
          <View style={styles.title}>
            <View style={[styles.imageWrapper, { backgroundColor: theme.colors.surfaceLight }]}>
              <ExpandableImage
                key={`image-${data.images[0]}`}
                source={{ uri: data.images[0].secureUrl }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                imageWrapper={{ borderRadius: 5 }}
                resizeMode={FastImage.resizeMode.contain}
                disableDelete
              />
            </View>
            <View className="flex flex-1 justify-center">
              <CustomText numberOfLines={3} type="predefault">
                {data.title}
              </CustomText>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={{ width: "55%", paddingRight: 10, display: "flex", gap: 5 }}>
              <View style={[styles.footerText]}>
                <CustomText type="small" color={theme.colors.text} numberOfLines={1}>
                  {formatDateRange(data.dateStart, data.dateEnd, settings.language)}
                </CustomText>
              </View>
              <View style={[styles.footerText]}>
                <CustomText type="small" color={theme.colors.text} numberOfLines={1}>
                  Entry fee: 100 UAH
                </CustomText>
              </View>
            </View>
            <View className="flex flex-row gap-4">
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.6}
              >
                <FontAwesome6 name="location-dot" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.6}
              >
                <Feather name="phone" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.6}
              >
                <Feather name="info" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    height: UserTournamentCard_HEIGHT,
    paddingHorizontal: 10,
  },

  imageWrapper: {
    width: 80,
    borderRadius: 5,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  contentHeader: {
    height: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    display: "flex",
    flexDirection: "row",
    height: 70,
    width: "100%",
    paddingTop: 10,
    gap: 20,
    // borderWidth: 1,
    // borderColor: "red",
  },

  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingTop: 8,
  },
  footerText: {
    paddingVertical: 2,
    borderRadius: 5,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  footerBtn: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
  },
});

export default UserTournamentCard;
