import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import BasketContextProvider from './src/contexts/BasketContext';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

export default function App() {
  return (
    <NavigationContainer>
      <BasketContextProvider>
        <RootNavigator />
      </BasketContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}