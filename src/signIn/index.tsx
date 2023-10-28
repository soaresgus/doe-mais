import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  Button,
  PaperProvider,
  RadioButton,
  useTheme,
} from 'react-native-paper';

import { Input } from '../components/Input';
import logoSrc from '../../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { BloodTypes } from '../types/BloodTypes';
import { Radio } from '../components/Radio';
import { theme } from '../_layout';

const SignIn = () => {
  const [name, setName] = useState<string>();
  const [bloodType, setBloodType] = useState<BloodTypes>(BloodTypes.A_POSITIVO);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const appTheme = useTheme();

  return (
    <View className="bg-[#200c10] h-full w-full items-center justify-center">
      <Image source={logoSrc} className="w-80 h-40" resizeMode="contain" />
      <ScrollView
        contentContainerStyle={{
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          value={name}
          onChangeText={(value) => setName(value)}
          label="Nome completo"
        />
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
        <RadioButton.Group
          value={bloodType}
          onValueChange={(value) => setBloodType(value as BloodTypes)}
        >
          <View className="flex flex-row">
            <Radio label="A+" value={BloodTypes.A_POSITIVO} />
            <Radio label="A-" value={BloodTypes.A_NEGATIVO} />
            <Radio label="B+" value={BloodTypes.B_POSITIVO} />
            <Radio label="B-" value={BloodTypes.B_NEGATIVO} />
            <Radio label="AB+" value={BloodTypes.AB_POSITIVO} />
            <Radio label="AB-" value={BloodTypes.AB_NEGATIVO} />
            <Radio label="O+" value={BloodTypes.O_POSITIVO} />
            <Radio label="O-" value={BloodTypes.O_NEGATIVO} />
          </View>
        </RadioButton.Group>
        <Button className="w-80" mode="outlined" loading={isLoading}>
          {!isLoading && 'ENTRAR'}
        </Button>
      </ScrollView>
      <StatusBar style="light" translucent backgroundColor="#200c10" />
    </View>
  );
};

export default SignIn;
