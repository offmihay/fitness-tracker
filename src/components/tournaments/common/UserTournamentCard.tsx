import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { TournamentBase } from "@/src/types/types";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import { Entypo, Feather, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { formatDateRange } from "@/src/utils/formatDateRange";
import { useSettings } from "@/src/hooks/useSettings";
import UserContextMenu, { UserContextOptions } from "./UserContextMenu";
import ButtonSmall from "@/src/shared/button/ButtonSmall";

type Props = {
  data: TournamentBase;
  onCardPress?: () => void;
  onLeavePress?: () => void;
};

export const UserTournamentCard_HEIGHT = 170;

const UserTournamentCard = (props: Props) => {
  const { data, onCardPress, onLeavePress } = props;
  const theme = useCustomTheme();
  const { settings } = useSettings();

  const onSelectOption = (option: UserContextOptions) => {
    if (option === "leave") {
      if (onLeavePress) {
        leaveTournamentConfirmationAlert(onLeavePress);
      }
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <View className="flex flex-row gap-2 items-center">
            <FontAwesome name="circle" size={10} color={theme.colors.success} />
            <CustomText type="small">{data.status}</CustomText>
          </View>
          <View className="flex flex-row items-center">
            <CustomText type="small">
              {formatDateRange(data.dateStart, data.dateEnd, settings.language)}
            </CustomText>
          </View>
        </View>
        <Divider />
        <TouchableOpacity onPress={onCardPress} activeOpacity={0.8}>
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
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={{ width: "50%", paddingRight: 10, display: "flex", gap: 5 }}>
            <ButtonSmall
              title="Users"
              style={{ backgroundColor: theme.colors.surfaceLight, height: 45 }}
              renderIcon={(color) => <Ionicons name="people-sharp" size={20} color={color} />}
            />
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
            <UserContextMenu onSelect={onSelectOption}>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                activeOpacity={0.5}
              >
                <Entypo name="dots-three-horizontal" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </UserContextMenu>
          </View>
        </View>
      </View>
    </View>
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
    paddingTop: 10,
  },
  footerText: {
    paddingVertical: 1,
    borderRadius: 5,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
  },

  footerBtn: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 5,
  },
});

export default UserTournamentCard;

export const leaveTournamentConfirmationAlert = (onPress: () => void) => {
  Alert.alert("Are you sure you want to leave this tournament?", "", [
    {
      text: "Leave",
      onPress: onPress,
      style: "destructive",
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};
