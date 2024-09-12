import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../../components/ThemedText";
import { Button, Modal, Portal, Searchbar } from "react-native-paper";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <View className="p-0">
      <ThemedText>HomePage</ThemedText>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
