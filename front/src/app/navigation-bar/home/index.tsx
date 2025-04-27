import React, { useState } from 'react';
import { View, Pressable, Text, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

<MaterialCommunityIcons name="mustache" size={24} color="black" />


export default function Home() {
  const [isOpenGuia, setIsOpenGuia] = useState(true);
  const [isOpenFast, setIsOpenFast] = useState(true);

  const toggleGuia = () => setIsOpenGuia(!isOpenGuia);
  const toggleFast = () => setIsOpenFast(!isOpenFast);

  return (
    <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
      {/* Imagem com texto sobrepondo */}
      <Pressable style={{ position: 'relative', width: '100%', height: 100, borderRadius: 8 }}>
        <Image
          source={require('@assets/images/trend.jpg')}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
        <Text
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: [{ translateY: -12 }],
            color: 'gray',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Trend
        </Text>
      </Pressable>

      {/* Guia */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginRight: 8 }}>Guia</Text>
        <Pressable
          onPress={toggleGuia}
          style={{
            width: 14,
            height: 14,
            borderRadius: 14,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name={isOpenGuia ? 'chevron-down' : 'chevron-right'} size={12} color="black" />
        </Pressable>
      </View>

      {isOpenGuia && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
          {[
            { label: 'Corte', icon: <Ionicons name="cut-outline" size={25} color="black" /> },
            { label: 'Barba', icon: <MaterialCommunityIcons name="mustache" size={30} color="black" /> },
            { label: 'Combos', icon: <Feather name="package" size={22} color="black" /> },
            { label: 'Alisamento', icon: <MaterialCommunityIcons name="hair-dryer" size={22} color="black" /> },
            { label: 'Sobrancelha', icon: <FontAwesome5 name="eye" size={18} color="black" /> },
          ].map((item, index) => (
            <View key={index} style={{ alignItems: 'center', marginRight: 20 }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                {item.icon}
              </View>
              <Text style={{ color: 'white', fontSize: 12 }}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Fast */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginRight: 8 }}>Fast</Text>
        <Pressable
          onPress={toggleFast}
          style={{
            width: 14,
            height: 14,
            borderRadius: 14,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name={isOpenFast ? 'chevron-down' : 'chevron-right'} size={12} color="black" />
        </Pressable>
      </View>

      {isOpenFast && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              subtitle: 'Em alta',
              icon: <FontAwesome5 name="fire" size={10} color="orange" />,
              title: 'Simples',
              price: '45.00',
              image: require('@assets/images/simples.webp'),
            },
            {
              subtitle: 'Trend',
              icon: null,
              title: 'Navalhado',
              price: '55.00',
              image: require('@assets/images/navalhado.jpg'),
            },
            {
              subtitle: 'Popular',
              icon: null,
              title: 'El Mustache',
              price: '80.00',
              image: require('@assets/images/elmustache.jpg'),
            },
            {
              subtitle: 'Econômico',
              icon: null,
              title: 'Raspagem',
              price: '35.00',
              image: require('@assets/images/raspado.webp'),
            },
            {
              subtitle: 'Premium',
              icon: null,
              title: 'Paisagismo',
              price: '110.00',
              image: require('@assets/images/trend.jpg'),
            },
          ].map((item, index) => (
            <View
              key={index}
              style={{
                marginRight: 20,
                alignItems: 'flex-start',
                paddingBottom: isOpenFast ? 15 : 0,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 8,
                  marginBottom: 4,
                }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.icon}
                <Text
                  style={{
                    color: '#A0A0A0',
                    fontSize: 10,
                    marginLeft: item.icon ? 4 : 0,
                    textAlign: 'left',
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginTop: 2, textAlign: 'left' }}>
                {item.title}
              </Text>
              <Text style={{ color: 'white', fontSize: 12, textAlign: 'left' }}>
                {item.price}
              </Text>
            </View>

          ))}
        </ScrollView>
      )}
    </View>
  );
}
