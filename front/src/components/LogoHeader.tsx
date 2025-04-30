import React from 'react';
import { Pressable, Image, View } from 'react-native';

interface LogoHeaderProps {
  reloadKey: number;
  onPress: () => void;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ reloadKey, onPress }) => {
  return (
    <View className="pt-1">
      <Pressable
        style={{ position: 'relative', width: '100%', height: 150, borderRadius: 8 }}
        onPress={onPress}
      >
        <Image
          key={reloadKey}
          source={require('@assets/images/logo-barbervibes.gif')}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
      </Pressable>
    </View>
  );
};

export default LogoHeader;
