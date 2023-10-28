import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import logoSrc from '../../assets/logo.png';

import {
  MD3LightTheme as DefaultTheme,
  Button,
  useTheme,
} from 'react-native-paper';
import { Input } from '../components/Input';
import { Link } from '@react-navigation/native';
import 'react-native-gesture-handler';

const Login = () => {
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
          onChangeText={(value: string) => setEmail(value)}
          label="Email"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={(value: string) => setPassword(value)}
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

        <Link to={{ screen: 'SignIn' }}>
          <Button className="w-80" mode="outlined">
            CADASTRE-SE
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default Login;
