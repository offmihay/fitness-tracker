import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tournament, TournamentBase, TournamentStatus } from "@/src/types/tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";
import ExpandableImage from "@/src/shared/image/ExpandableImage";
import FastImage from "@d11/react-native-fast-image";
import CustomText from "@/src/shared/text/CustomText";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { useSettings } from "@/src/hooks/useSettings";
import { formatDateTime } from "@/src/utils/formatDateTime";
import ButtonSmall from "@/src/shared/button/ButtonSmall";
import CreatorContextMenu, { CreatorContextOptions } from "./CreatorContextMenu";
import { UserTournamentCard_HEIGHT } from "./UserTournamentCard";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { formatDateRange } from "@/src/utils/formatDateRange";
import CreatorFinishedContextMenu from "./CreatorFinishedContextMenu";
import StatusLabel from "../../home/common/StatusLabel";
import {
  activateFinishedAlert,
  deactivateConfirmationAlert,
  deleteConfirmationAlert,
} from "@/src/shared/alerts/alerts";

type Props = {
  data: TournamentBase;
  onCardPress?: () => void;
  onEditPress?: () => void;
  onAdditionalOptionsPress?: () => void;
  onDeletePress?: () => void;
  changeStatusPress?: (isActive: boolean) => void;
};

const CreatorTournamentCard = (props: Props) => {
  const { data, onCardPress, onEditPress, onDeletePress, changeStatusPress } = props;
  const theme = useCustomTheme();
  const { settings } = useSettings();
  const { t } = useTranslation();

  const onSelectOption = (option: CreatorContextOptions) => {
    if (option === "delete") {
      onDeletePress && deleteConfirmationAlert(onDeletePress, t);
    } else if (option === "deactivate") {
      changeStatusPress && deactivateConfirmationAlert(() => changeStatusPress(false), t);
    } else if (option === "activate") {
      if (data.status === TournamentStatus.FINISHED) {
        activateFinishedAlert(() => {
          router.navigate({
            pathname: `/tournaments/edit`,
            params: {
              id: data.id,
            },
          });
        }, t);
      } else {
        changeStatusPress && changeStatusPress(true);
      }
    }
  };

  const openParticipants = () => {
    router.navigate({
      pathname: `/tournaments/${data.id}/participants`,
      params: {
        type: "creator",
      },
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
            <ButtonSmall
              onPress={onEditPress}
              title={t("common.edit")}
              style={{ backgroundColor: theme.colors.primary }}
              renderIcon={(color) => <Feather name="edit-3" size={20} color="white" />}
              textColor="white"
              textProps={{ type: "predefault" }}
            />
          </View>

          <View className="w-1/2">
            <View className="flex flex-row gap-2">
              <ButtonSmall
                style={{ backgroundColor: theme.colors.surfaceLight, flex: 1 }}
                renderIcon={(color) => <Ionicons name="people-sharp" size={20} color={color} />}
                onPress={openParticipants}
              />

              {data.status === TournamentStatus.FINISHED ? (
                <CreatorFinishedContextMenu onSelect={onSelectOption}>
                  <TouchableOpacity
                    style={[styles.footerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                    activeOpacity={0.5}
                  >
                    <Entypo name="dots-three-horizontal" size={24} color={theme.colors.text} />
                  </TouchableOpacity>
                </CreatorFinishedContextMenu>
              ) : (
                <CreatorContextMenu onSelect={onSelectOption} isActive={data.isActive}>
                  <TouchableOpacity
                    style={[styles.footerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                    activeOpacity={0.5}
                  >
                    <Entypo name="dots-three-horizontal" size={24} color={theme.colors.text} />
                  </TouchableOpacity>
                </CreatorContextMenu>
              )}
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
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
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

export default CreatorTournamentCard;
