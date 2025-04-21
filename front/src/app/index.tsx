import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../components/_layout/header";
import { Body } from "./navigation-bar/home";

import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-gray-700"
      showsVerticalScrollIndicator={false}
    >


      {/* Espaçamento entre Header e Body */}
      <View className="w-full px-1 mt-4">
        <Body />
      </View>
    </ScrollView>
  );
}
