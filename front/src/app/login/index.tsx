import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';


export default function Login() {
  return (
    <View className="flex-1 bg-transparent pt-20 items-center">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-white font-bold text-2xl mb-8">
            Seja muito bem-vindo!
          </Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#E5E7EB"
            className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white"
          />

          <TextInput
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#E5E7EB"
            className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white"
          />

          <Pressable className="bg-indigo-600 rounded-lg py-3 items-center mb-4">
            <Text className="text-white font-bold text-base">
              Entrar
            </Text>
          </Pressable>

          <Pressable className="self-center">
            <Text className="text-gray-400 text-sm">
              Esqueci a senha
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Rodapé fixo */}
      <View className="items-center py-20">
        <Text className="text-gray-400  text-xs">
          L2DC - todos os direitos reservados
        </Text>
      </View>
    </View>
  );
}
