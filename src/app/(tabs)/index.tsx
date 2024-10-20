import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <SafeAreaView>
      <Button mode="contained" onPress={() => alert("asd")}>
        click me
      </Button>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
