import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import { LogBox } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import config from "./aws-exports";

Amplify.configure(config)

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  LogBox.ignoreLogs(['Setting a timer']);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)
