import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Footer } from '@components/_layout/footer';
import { usePathname } from 'expo-router'; // Use usePathname para verificar a rota atual

export default function RootLayout() {
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const fadeHeight = Math.min(scrollY / 2, 100) + 10;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            {/* Fundo cinza para cobrir o espaço mesmo sem conteúdo */}
            <View style={{ flex: 1, backgroundColor: '#374151', minHeight: 550 }}>
              <Slot />
            </View>
          </View>
        </ScrollView>
        {/* Exibe o Footer apenas se a rota não for '/register' */}
        {pathname !== '/register' && <Footer />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  gradientFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#374151', // bg-gray-700
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
