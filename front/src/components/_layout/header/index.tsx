import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export function Header() {
  return (
    <View className="px-4 bg-transparent" style={{ marginTop: statusBarHeight + 8 }}>
      <View className="flex-row items-center">
        {/* Campo de busca com borda branca */}
        <View className="flex-row items-center border border-white rounded-lg px-1 h-[30px] flex-1 bg-white">
          <Feather name="search" size={16} color="#374151" />
          <TextInput
            placeholder="Buscar"
            placeholderTextColor="#374151"
            className="ml-2 text-[#374151] flex-1 py-1"
          />
        </View>
      </View>

      {/* Botões horizontais */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
        {[
          { text: 'Favoritos', icon: 'heart' },
          { text: 'Histórico', icon: 'clock' },
          { text: 'Following', icon: 'user-check' },
          { text: 'Catálogo', icon: 'book-open' },
          { text: 'Pagamentos', icon: 'dollar-sign' },
        ].map((button, index) => (
          <Pressable
            key={index}
            className="flex-row items-center h-7 px-4 mr-2 border border-white rounded-xl bg-transparent"
          >
            <Feather name={button.icon as any} size={14} color="white" />
            <Text className="text-white text-xs ml-1.5">{button.text}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
