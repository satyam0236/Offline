import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/constants';
import { NavigationProvider, useNavigation } from './src/navigation/NavigationContext';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import ChatScreen from './src/screens/ChatScreen';
import GamesLobbyScreen from './src/screens/GamesLobbyScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CallScreen from './src/screens/CallScreen';

function RootSwitch() {
  const { current } = useNavigation();

  switch (current) {
    case 'Splash':
      return <SplashScreen />;
    case 'Onboarding':
      return <OnboardingScreen />;
    case 'Home':
      return <HomeScreen />;
    case 'Nearby':
      return <NearbyScreen />;
    case 'Chat':
      return <ChatScreen />;
    case 'GamesLobby':
      return <GamesLobbyScreen />;
    case 'Settings':
      return <SettingsScreen />;
    case 'Call':
      return <CallScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <NavigationProvider>
        <RootSwitch />
      </NavigationProvider>
    </SafeAreaProvider>
  );
}
