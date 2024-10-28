import { StyleSheet, TextInput, View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import CustomText from "../../../components/shared/text/CustomText";
import { useAuth } from "../../../hooks/useAuth";

type PersonalInfoProps = {};

const PersonalInfo = ({}: PersonalInfoProps) => {
  const { userInfo } = useAuth();

  return (
    <View className="m-4">
      <CustomText>{userInfo?.user.email}</CustomText>
      <CustomText>{userInfo?.user.id}</CustomText>
      <CustomText>{userInfo?.user.firstName}</CustomText>
      <CustomText>{userInfo?.user.secondName}</CustomText>
      <CustomText>{userInfo?.user.username}</CustomText>
      {userInfo?.user.photo && (
        <Image style={{ width: 200, height: 200 }} source={{ uri: userInfo?.user.photo }} />
      )}
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
