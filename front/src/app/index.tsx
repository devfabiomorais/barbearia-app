import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../components/header";
import { Body } from "../components/body";

import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-gray-700"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
      </View>

      {/* Espaçamento entre Header e Body */}
      <View className="w-full px-4 mt-4">
        <Body />
      </View>
    </ScrollView>
  );
}
