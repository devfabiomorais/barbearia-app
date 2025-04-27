import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';

export default function Register() {
  const [reloadKey, setReloadKey] = useState(0);

  const handlePress = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  return (
    <><View className='pt-6'>
      <Pressable
        style={{ position: 'relative', width: '100%', height: 150, borderRadius: 8 }}
        onPress={handlePress}>
        <Image
          key={reloadKey}
          source={require('@assets/images/logo-barbervibes.gif')}
          style={{ width: '100%', height: '100%', borderRadius: 8 }} />
      </Pressable>

    </View><View className="flex-1 bg-transparent pt-8 items-center">
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >


          <View className="w-full px-6 ">
            <Text className="text-white text-center font-bold text-2xl mb-8 ">
              Seja bem-vindo(a)!
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white" />

            <TextInput
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white" />

            <TextInput
              placeholder="Repita a senha"
              secureTextEntry
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white" />

            <Pressable className="bg-green-500 rounded-lg py-3 items-center mb-4">
              <Text className="text-white font-bold text-base">
                Cadastrar
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Rodapé fixo no fundo */}
        <View className="items-center mt-auto py-4">
          <Text className="text-gray-400 text-xs">
            © L2DC. Todos os direitos reservados.
          </Text>
        </View>
      </View></>
  );
}
