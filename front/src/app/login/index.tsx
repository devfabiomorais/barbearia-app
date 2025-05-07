import LogoHeader from '@/components/LogoHeader';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.15.7:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setEmail('');
      setSenha('');

      // Redireciona após login (ex: para página inicial ou dashboard)
      router.push('/navigation-bar/home'); // Altere conforme necessário
    } catch (error: any) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <>
      <LogoHeader />

      <View className="flex-1 bg-transparent pt-2 items-center justify-between">
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full px-6">
            <Text className="text-white text-center font-bold text-2xl mb-6">
              Faça login abaixo:
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-4 text-white"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white"
              value={senha}
              onChangeText={setSenha}
            />

            <Pressable
              className="bg-blue-500 rounded-lg py-3 items-center mb-4"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-base">
                Entrar
              </Text>
            </Pressable>

            <Pressable
              className="bg-transparent rounded-lg py-3 items-center mb-4"
              onPress={() => router.push('/register')}
            >
              <Text className="text-gray-400 font-bold text-base">
                Criar conta
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
