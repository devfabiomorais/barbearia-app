import { View, Pressable } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';

export function Footer() {
  return (
    <View className="flex-row justify-around items-center h-[60px] bg-white border-t border-t-[#ddd]">
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
  );
}
