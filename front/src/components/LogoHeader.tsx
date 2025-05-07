import React from 'react';
import { Pressable, Image, View } from 'react-native';

const LogoHeader: React.FC = () => {
  return (
    <View className="pt-1 px-4">
      <Pressable
        style={{ position: 'relative', width: '100%', height: 150, borderRadius: 8 }}
      >
        <Image
          source={require('@assets/images/logo-barbervibes.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode='contain'
        />
      </Pressable>
    </View>
  );
};

export default LogoHeader;
