import LogoHeader from '@/components/LogoHeader';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, Alert } from 'react-native';

export default function Register() {
  const [reloadKey, setReloadKey] = useState(0);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handlePress = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  const handleRegister = async () => {
    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const response = await fetch('http://192.168.15.7:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: email.split('@')[0],
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');

      setEmail('');
      setSenha('');
      setConfirmSenha('');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <>

      <LogoHeader reloadKey={reloadKey} onPress={handlePress} />



      <View className="flex-1 bg-transparent pt-2 items-center justify-between">
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full px-6 ">
            <Text className="text-white text-center font-bold text-2xl mb-6 ">
              Cadastre-se abaixo:
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
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-4 text-white"
              value={senha}
              onChangeText={setSenha}
            />

            <TextInput
              placeholder="Repita a senha"
              secureTextEntry
              placeholderTextColor="#E5E7EB"
              className="w-full h-12 border border-gray-400 rounded-lg px-3 mb-6 text-white"
              value={confirmSenha}
              onChangeText={setConfirmSenha}
            />

            <Pressable
              className="bg-green-500 rounded-lg py-3 items-center mb-4"
              onPress={handleRegister}
            >
              <Text className="text-white font-bold text-base">
                Cadastrar
              </Text>
            </Pressable>

            <Pressable
              className="bg-transparent rounded-lg py-3 items-center mb-4"
              onPress={() => router.push('/login')}
            >
              <Text className="text-gray-400 font-bold text-base">
                Já tenho conta
              </Text>
            </Pressable>
          </View>
        </ScrollView>

      </View>
    </>
  );
}
