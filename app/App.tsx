import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Landing from './src/screens/Landing';

export default function App() {

  return (
    <Landing />
  )

  return (
    <View className='flex-1 w-full bg-red-200 items-center justify-center '>
      <StatusBar style="auto" />
    </View>
  );
}