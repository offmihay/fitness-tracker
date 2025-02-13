import { Alert, Linking, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { TournamentBase, TournamentStatus } from "@/src/types/tournament";
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
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import StatusLabel from "../../home/common/StatusLabel";
import { formatDateTime } from "@/src/utils/formatDateTime";
import Toast from "react-native-toast-message";
import { leaveTournamentConfirmationAlert } from "@/src/shared/alerts/alerts";

type Props = {
  data: TournamentBase;
  onCardPress?: () => void;
  onLeavePress?: () => void;
};

export const UserTournamentCard_HEIGHT = 175;

const UserTournamentCard = (props: Props) => {
  const { data, onCardPress, onLeavePress } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useCustomTheme();
  const { settings } = useSettings();

  const onSelectOption = (option: UserContextOptions) => {
    if (option === "leave") {
      if (onLeavePress) {
        leaveTournamentConfirmationAlert(onLeavePress, t);
      }
    }
  };

  const openMaps = () => {
    const latitude = data.geoCoordinates.latitude;
    const longitude = data.geoCoordinates.longitude;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleMapsUrl = `maps://?q=${latitude},${longitude}`;

    const url = Platform.select({
      ios: appleMapsUrl,
      android: googleMapsUrl,
    });

    if (url) {
      Linking.openURL(url).catch((err) =>
        Toast.show({
          type: "toastError",
          props: { text: t("error.couldNotOpenMaps") },
        })
      );
    }
  };

  const openParticipants = () => {
    router.navigate({
      pathname: `/tournaments/${data.id}/participants`,
    });
  };

  const openOrganizer = () => {
    router.navigate({
      pathname: `/tournaments/${data.id}/organizer-details`,
    });
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <View className="flex flex-row gap-2 items-center">
            <StatusLabel type={data.isActive ? data.status : "DEACTIVATED"} />
          </View>
          <View className="flex flex-row items-center">
            <CustomText type="small">
              {formatDateTime(data.joinedCreatedAt, settings.language)}
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
              <CustomText numberOfLines={2} type="predefault" weight="bold">
                {data.title}
              </CustomText>
              <View className="flex flex-1 justify-end">
                <CustomText type="small">
                  {formatDateRange(data.dateStart, data.dateEnd, settings.language)}
                </CustomText>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View className="w-1/2 pr-3">
            <View className="flex flex-row flex-1 gap-2">
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.primary, flex: 1 }]}
                activeOpacity={0.6}
                onPress={openMaps}
              >
                <FontAwesome6 name="location-dot" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.primary, flex: 1 }]}
                activeOpacity={0.6}
                onPress={openOrganizer}
              >
                <Feather name="phone" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-1/2">
            <View className="flex flex-row gap-2">
              <ButtonSmall
                style={{ backgroundColor: theme.colors.surfaceLight, flex: 1 }}
                renderIcon={(color) => <Ionicons name="people-sharp" size={20} color={color} />}
                onPress={openParticipants}
              />

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
    height: 38,
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
  },

  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingBottom: 5,
    paddingTop: 15,
  },

  footerBtn: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
});

export default UserTournamentCard;
