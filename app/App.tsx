import { useFonts } from 'expo-font';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import Navigation from './src/Navigation';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';

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
    <RootSiblingParent>
      <Provider store={store} >
        <View onLayout={handleOnLayout} className='flex-1'>
          <Navigation />
        </View>
      </Provider>
    </RootSiblingParent>
  )
}