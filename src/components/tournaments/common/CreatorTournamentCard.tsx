import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tournament, TournamentBase } from "@/src/types/types";
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

type Props = {
  data: TournamentBase;
  onCardPress?: () => void;
  onEditPress?: () => void;
  onAdditionalOptionsPress?: () => void;
  onDeletePress?: () => void;
};

const CreatorTournamentCard = (props: Props) => {
  const { data, onCardPress, onEditPress, onDeletePress } = props;
  const theme = useCustomTheme();
  const { settings } = useSettings();

  const onSelectOption = (option: CreatorContextOptions) => {
    if (option === "delete") {
      if (onDeletePress) {
        deleteTournamentConfirmationAlert(onDeletePress);
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
              <CustomText numberOfLines={3} type="default">
                {data.title}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              gap: 8,
              justifyContent: "space-between",
            }}
          >
            <View className="flex-1">
              <ButtonSmall
                onPress={onEditPress}
                title="Edit"
                style={{ backgroundColor: theme.colors.primary, width: "100%" }}
                renderIcon={(color) => <Feather name="edit-3" size={20} color="white" />}
                textColor="white"
              />
            </View>
            <View>
              <ButtonSmall
                title="Users"
                style={{ backgroundColor: theme.colors.surfaceLight }}
                renderIcon={(color) => <Ionicons name="people-sharp" size={20} color={color} />}
                onPress={openParticipants}
              />
            </View>
            <CreatorContextMenu onSelect={onSelectOption}>
              <TouchableOpacity
                style={[styles.footerBtn, { backgroundColor: theme.colors.surfaceLight }]}
                activeOpacity={0.5}
              >
                <Entypo name="dots-three-horizontal" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </CreatorContextMenu>
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
  },

  footer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
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

export const deleteTournamentConfirmationAlert = (onPress: () => void) => {
  Alert.alert("Are you sure you want to delete this tournament?", "", [
    {
      text: "Delete",
      onPress: onPress,
      style: "destructive",
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};
