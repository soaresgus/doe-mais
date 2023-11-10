import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import {
  PaperProvider,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/routes/Login';
import SignIn from './src/routes/SignIn';
import { registerRootComponent } from 'expo';
import ForgotPassword from './src/routes/ForgotPassword';
import Home from './src/routes/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/User';
import { useUser } from './src/context/User/useUser';
import { User } from './src/context/User/types';
import ComingSoon from './src/routes/ComingSoon';
import Donate from './src/routes/Donate';
import ConfirmDonate from './src/routes/Donate/ConfirmDonate';
import UnableToDonate from './src/routes/Donate/UnableToDonate';
import Ranking from './src/routes/Ranking';
SplashScreen.preventAutoHideAsync();

export const theme = {
  colors: {
    primary: 'rgb(186, 26, 32)',
    darkPrimary: 'rgb(32, 12, 16)',
    secondary: 'rgb(156, 65, 66)',
    tertiary: 'rgb(0, 109, 56)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 218, 214)',
    onPrimaryContainer: 'rgb(65, 0, 3)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 218, 216)',
    onSecondaryContainer: 'rgb(65, 0, 7)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(155, 246, 178)',
    onTertiaryContainer: 'rgb(0, 33, 13)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 25)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 25)',
    surfaceVariant: 'rgb(245, 221, 219)',
    onSurfaceVariant: 'rgb(83, 67, 66)',
    outline: 'rgb(133, 115, 113)',
    outlineVariant: 'rgb(216, 194, 191)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 46)',
    inverseOnSurface: 'rgb(251, 238, 236)',
    inversePrimary: 'rgb(255, 179, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(252, 240, 244)',
      level2: 'rgb(250, 233, 237)',
      level3: 'rgb(247, 226, 231)',
      level4: 'rgb(247, 224, 228)',
      level5: 'rgb(245, 220, 224)',
    },
    surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
    backdrop: 'rgba(59, 45, 44, 0.4)',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const { user, setFirebaseUser, isLoading } = useUser();

  const Stack = createStackNavigator();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setFirebaseUser({
        displayName: response?.displayName!,
        email: response?.email!,
      });
    });

    return subscriber;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });

  return (
    <UserProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            onLayout={onLayoutRootView}>
            <NavigationContainer theme={LightTheme}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ComingSoon" component={ComingSoon} />
                <Stack.Screen name="Donate" component={Donate} />
                <Stack.Screen name="ConfirmDonate" component={ConfirmDonate} />
                <Stack.Screen
                  name="UnableToDonate"
                  component={UnableToDonate}
                />
                <Stack.Screen name="Ranking" component={Ranking} />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" translucent backgroundColor="#200c10" />
          </KeyboardAwareScrollView>
        </PaperProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

registerRootComponent(App);
