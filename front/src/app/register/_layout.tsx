import { Slot } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';

export default function RegisterLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Conteúdo das páginas */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* Rodapé fixo */}
      <View className="bg-gray-700 items-center py-2">
        <Text className="text-gray-400 text-xs">
          © L2DC. Todos os direitos reservados.
        </Text>
      </View>
    </SafeAreaView>
  );
}
