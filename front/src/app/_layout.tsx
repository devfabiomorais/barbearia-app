import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../styles/global.css';
import { Slot } from 'expo-router';
import { StyleSheet, View, Pressable, Image, ScrollView } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';

export default function RootLayout() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  // O fade será mais agressivo conforme o scroll sobe, com um mínimo inicial de 10px
  const fadeHeight = Math.min(scrollY / 2, 100) + 10; // 10px no início para o fade leve

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* Imagem fixa no topo com o fade */}
        <ScrollView
          style={{ flex: 1 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/images/banner.jpg')}
                style={styles.topImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', '#374151']}
                style={[styles.gradientFade, { height: fadeHeight }]}
              />
            </View>

            {/* Fundo cinza para cobrir o espaço mesmo sem conteúdo */}
            <View style={{ flex: 1, backgroundColor: '#374151', minHeight: 400 }}>
              <Slot />
            </View>
          </View>
        </ScrollView>


        {/* Rodapé fixo */}
        <View style={styles.footer}>
          <Pressable>
            <Feather name="home" size={24} color="black" />
          </Pressable>
          <Pressable>
            <Feather name="compass" size={24} color="black" />
          </Pressable>
          <Pressable>
            <Feather name="shopping-cart" size={24} color="black" />
          </Pressable>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
          <Pressable>
            <FontAwesome name="user-o" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fixedGrayBackground: {
    position: 'absolute',
    top: 100, // mesma altura da imagem do topo
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#374151',
    zIndex: -1,
  },
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


