import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <View className="p-0">
      <Text>HomePage</Text>
      <Link className="text-[#5d6aff]" href="(tabs)/info">
        go info
      </Link>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
