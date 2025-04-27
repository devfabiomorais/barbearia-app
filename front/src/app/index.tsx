import { View, ScrollView } from 'react-native';
import Login from './login';
import Home from './navigation-bar/home';
import Constants from 'expo-constants';
import Register from './register';

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: '#374151' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, paddingTop: statusBarHeight, justifyContent: 'center', alignItems: 'center' }}>
          <Home />
        </View>
      </ScrollView>
    </View>
  );
}
