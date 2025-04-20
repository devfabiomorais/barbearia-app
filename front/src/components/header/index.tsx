import { View, Pressable, TextInput, ScrollView, Text, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export function Header() {
  return (
    <>

      {/* Container com padding lateral */}
      <View className="pl-2 pt-2 flex-1">
        <View className="flex-row items-center justify-between">
          {/* Botão */}
          <Pressable className="w-[35px] h-[35px] bg-white rounded-md items-center justify-center mr-2">
            <Ionicons name="menu-outline" size={20} color="black" />
          </Pressable>

          {/* Campo de busca */}
          <View className="flex-row items-center bg-white rounded-md px-3 h-[35px] flex-1">
            <Feather name="search" size={16} color="gray" />
            <TextInput
              placeholder="Buscar"
              placeholderTextColor="gray"
              className="ml-2 flex-1 py-[6px]"
            />
          </View>
        </View>

        {/* Scroll horizontal com botões */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          {[
            { text: 'Favoritos', icon: 'heart' as const },
            { text: 'Histórico', icon: 'clock' as const },
            { text: 'Following', icon: 'user-check' as const },
            { text: 'Catálogo', icon: 'book-open' as const },
            { text: 'Pagamentos', icon: 'dollar-sign' as const }
          ].map((button, index) => (
            <Pressable
              key={index}
              className="bg-transparent border border-white rounded-lg h-[25px] px-3 py-1 mr-2 flex-row items-center"
            >
              <Feather name={button.icon} size={14} color="white" />
              <Text className="text-white text-[12px] text-center ml-2">{button.text}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
