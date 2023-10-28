import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import logoSrc from '../../../assets/logo.png';

import { Button, useTheme } from 'react-native-paper';
import { Input } from '../../components/Input';
import { Link } from '@react-navigation/native';
import 'react-native-gesture-handler';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="bg-[#200c10] h-full w-full items-center justify-center">
      <Image source={logoSrc} className="w-80 h-40" resizeMode="contain" />
      <View className="gap-4 items-center justify-center">
        <Input
          value={email}
          onChangeText={(value: string) => setEmail(value)}
          label="Email"
          keyboardType="email-address"
          extendedClasses="w-80"
        />
        <Button className="w-80" mode="outlined" loading={isLoading}>
          {!isLoading && 'ENVIAR'}
        </Button>

        <Link to={{ screen: 'Login' }}>
          <Button className="w-80" mode="outlined">
            VOLTAR
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default ForgotPassword;
