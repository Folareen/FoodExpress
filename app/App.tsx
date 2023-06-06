import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Landing from './src/screens/Landing';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import Navigation from './src/Navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isLoaded] = useFonts({
    "normal": require("./src/assets/fonts/Nunito-Regular.ttf"),
    "bold": require("./src/assets/fonts/Nunito-SemiBold.ttf"),
    "extrabold": require("./src/assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View onLayout={handleOnLayout} className='flex-1'>
      <Navigation />
    </View>
  )
}