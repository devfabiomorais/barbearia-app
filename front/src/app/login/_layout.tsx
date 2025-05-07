import { Slot } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';

export default function LoginLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Conteúdo da página */}
        <View style={{ flex: 1 }}>
          <Slot />
        </View>

        {/* Rodapé fixo */}
        <View className="bg-gray-700 items-center py-2">
          <Text className="text-gray-400 text-xs">
            © L2DC. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
