import { View, Pressable } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function Footer() {
  const router = useRouter();

  return (
    <View className="flex-row justify-around items-center h-[60px] bg-white border-t border-t-[#ddd]">
      <Pressable className="navigation-bar-button" onPress={() => router.push('/navigation-bar/home')}>
        <Feather name="home" size={24} color="black" />
      </Pressable>
      <Pressable className="navigation-bar-button">
        <Feather name="compass" size={24} color="black" />
      </Pressable>
      <Pressable className="navigation-bar-button">
        <Feather name="shopping-cart" size={24} color="black" />
      </Pressable>
      <Pressable className="navigation-bar-button">
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>
      <Pressable className="navigation-bar-button" onPress={() => router.push('/register')}>
        <FontAwesome name="user-o" size={24} color="black" />
      </Pressable>
    </View>
  );
}
