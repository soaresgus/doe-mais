import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import logoSrc from '../assets/logo.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  MD3LightTheme as DefaultTheme,
  Button,
  PaperProvider,
  useTheme,
} from 'react-native-paper';
import { Input } from '../src/components/Input';
import rgbHex from 'rgb-hex';
import { Link } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(186, 26, 32)',
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

export default function Main() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      onLayout={onLayoutRootView}
    >
      <PaperProvider theme={theme}>
        <Login />
      </PaperProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const appTheme = useTheme();

  return (
    <View className="bg-[#200c10] h-full w-full items-center justify-center">
      <Image source={logoSrc} className="w-80 h-40" resizeMode="contain" />
      <View className="gap-4 items-center justify-center]">
        <Input
          value={email}
          onChangeText={(value) => setEmail(value)}
          label="Email"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={(value) => setPassword(value)}
          label="Senha"
          secureTextEntry
        />
        <Button className="w-80" mode="outlined" loading={isLoading}>
          {!isLoading && 'ENTRAR'}
        </Button>

        <View className="flex flex-row items-center gap-2 w-full">
          <View
            className="w-1/5 h-[1px] block"
            style={{ backgroundColor: appTheme.colors.primaryContainer }}
          />
          <Text style={{ color: appTheme.colors.primaryContainer }}>
            Não possui cadastro?
          </Text>
          <View
            className="w-1/5 h-[1px] block bg-white"
            style={{ backgroundColor: appTheme.colors.primaryContainer }}
          />
        </View>

        <Link href="/signIn">
          <Button className="w-80" mode="outlined">
            CADASTRE-SE
          </Button>
        </Link>
      </View>
      <StatusBar style="light" translucent backgroundColor="#200c10" />
    </View>
  );
}
