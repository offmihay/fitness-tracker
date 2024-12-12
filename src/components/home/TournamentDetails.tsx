import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import CustomMap from "../shared/map/CustomMap";
import CustomText from "../shared/text/CustomText";
import TouchableBtn from "../shared/touchable/TouchableBtn";
import { Image } from "expo-image";
import { Tournament } from "@/src/types/Tournament";
import { useCustomTheme } from "@/src/hooks/useCustomTheme";

type Props = {
  data: Tournament;
  handleOpenRules: () => void;
  handleOpenParticipants: () => void;
  handleOpenOrganizer: () => void;
};

const TournamentDetails = ({
  data,
  handleOpenRules,
  handleOpenParticipants,
  handleOpenOrganizer,
}: Props) => {
  const theme = useCustomTheme();

  return (
    <View className="flex flex-col gap-6">
      <View style={{ width: "100%", borderRadius: 10, height: 200, overflow: "hidden" }}>
        <Image source={data?.imageUrl} style={StyleSheet.absoluteFill} />
      </View>
      <View className="flex flex-row justify-between">
        <TouchableBtn title="Register" style={{ width: "48%" }} />
        <TouchableBtn type="grey" title="Save for Later" style={{ width: "48%" }} />
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <CustomText type="subtitle" className="mb-4">
          Description
        </CustomText>
        <CustomText>{data?.description}</CustomText>
      </View>
      <View className="flex flex-row justify-around my-2">
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            activeOpacity={0.8}
            onPress={() => handleOpenParticipants()}
          >
            <Ionicons name="people-sharp" size={24} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">Participants</CustomText>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            activeOpacity={0.8}
            onPress={() => handleOpenRules()}
          >
            <Ionicons name="information-circle" size={24} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">Rules</CustomText>
        </View>
        <View className="flex flex-col items-center gap-2">
          <TouchableOpacity
            style={[{ backgroundColor: theme.colors.primary }, styles.btn]}
            className="pl-2"
            activeOpacity={0.8}
            onPress={() => handleOpenOrganizer()}
          >
            <FontAwesome6 name="building-circle-check" size={20} color={theme.colors.deep} />
          </TouchableOpacity>
          <CustomText weight="semibold">Organizer</CustomText>
        </View>
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="sports-tennis" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Sport type: </CustomText>
              {data?.sportType}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Format: </CustomText>
              {data?.format}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Skill Level: </CustomText>
              {data?.skillLevel}
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <MaterialIcons name="18-up-rating" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Age Restriction: </CustomText>
              {data?.ageRestrictions.maxAge
                ? `${data?.ageRestrictions.minAge} - ${data.ageRestrictions.maxAge}`
                : `${data?.ageRestrictions.minAge}+`}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="money-check" size={21} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Entry fee: </CustomText>
              {data?.entryFee} UAH
            </CustomText>
          </View>
          <View className="flex flex-row gap-4 items-center">
            <FontAwesome6 name="sack-dollar" size={24} color={theme.colors.primary} />
            <CustomText>
              <CustomText weight="bold">Prize Pool: </CustomText>
              {data?.prizePool} UAH
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={[{ backgroundColor: theme.colors.surface, borderRadius: 10, overflow: "hidden" }]}
      >
        <View style={styles.infoBlock}>
          <CustomText type="subtitle" className="mb-4">
            Location
          </CustomText>
          <CustomText className="mb-2">
            {data?.city}, {data?.location}
          </CustomText>
        </View>
        <View style={{ width: "100%", height: 250 }}>
          <CustomMap geoCoordinates={data?.geoCoordinates} description={data?.location} />
        </View>
      </View>
      <View style={[styles.infoBlock, { backgroundColor: theme.colors.surface }]}>
        <CustomText type="subtitle" className="mb-4">
          Organizer Details
        </CustomText>
        <CustomText>Organized by {data?.organizer.name}.</CustomText>
        <CustomText>
          Contact us:<CustomText> </CustomText>
          <CustomText type="link">{data?.organizer.contact.email}.</CustomText>
        </CustomText>
        {data?.organizer.contact.phone && <CustomText>{data?.organizer.contact.phone}</CustomText>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  prizeBlock: {
    borderRadius: 10,
    width: "35%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: 60,
    height: 60,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TournamentDetails;
