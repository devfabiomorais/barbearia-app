import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@styles/global.css';
import { Slot } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function LoginLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1, backgroundColor: '#374151', minHeight: 550 }}>
            <Slot />
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
