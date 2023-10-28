import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import {
  Button,
  PaperProvider,
  RadioButton,
  useTheme,
} from 'react-native-paper';

import { Input } from '../../components/Input';
import logoSrc from '../../../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { BloodTypes } from '../../types/BloodTypes';
import { Radio } from '../../components/Radio';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from '@react-navigation/native';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUserFormSchema = z.object({
    email: z
      .string()
      .email('Formato de e-mail inválido')
      .min(1, 'Campo obrigatório'),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
    name: z.string().min(1, 'Campo obrigatório'),
    bloodType: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .default('A+'),
    userType: z.enum(['doador', 'necessita']).default('doador'),
    cep: z.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
      bloodType: 'A+',
      userType: 'doador',
      cep: '',
    },
  });

  const createUser = (data: any) => {
    console.log(data);
  };

  const appTheme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        paddingTop: 80,
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#200c10',
      }}
    >
      <Image source={logoSrc} className="w-80 h-40" resizeMode="contain" />
      <View className="flex gap-4 px-8">
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Nome completo"
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text className="text-lg text-red-500">{errors.name?.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Email"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-lg text-red-500">
              {errors.email?.message}
            </Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Senha"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-[16px] text-red-500">
              {errors.password?.message}
            </Text>
          )}
        </View>

        <View>
          <Text className="text-white text-xl font-medium">Tipo sanguíneo</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                <View className="flex flex-row flex-wrap justify-center">
                  <Radio
                    label="A+"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                    value={BloodTypes.A_POSITIVO}
                    extendedClasses="flex-row items-center justify-center"
                  />
                  <Radio
                    label="A-"
                    value={BloodTypes.A_NEGATIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="B+"
                    value={BloodTypes.B_POSITIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="B-"
                    value={BloodTypes.B_NEGATIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="AB+"
                    value={BloodTypes.AB_POSITIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="AB-"
                    value={BloodTypes.AB_NEGATIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="O+"
                    value={BloodTypes.O_POSITIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                  <Radio
                    label="O-"
                    value={BloodTypes.O_NEGATIVO}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  />
                </View>
              </RadioButton.Group>
            )}
            name="bloodType"
          />
        </View>

        <View>
          <Text className="text-white text-xl font-medium">
            Tipo de usuário
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                <View className="flex flex-row flex-wrap">
                  <Radio
                    position="leading"
                    label="Doador"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: '200',
                    }}
                    value={'doador'}
                    extendedClasses="flex-row items-center justify-center"
                  />
                  <Radio
                    position="leading"
                    label="Necessita de sangue"
                    value={'necessita'}
                    extendedClasses="flex-row items-center justify-center"
                    labelStyle={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: '200',
                    }}
                  />
                </View>
              </RadioButton.Group>
            )}
            name="userType"
          />
        </View>

        <Button
          className="w-80"
          mode="outlined"
          loading={isLoading}
          onPress={handleSubmit(createUser)}
        >
          {!isLoading && 'CRIAR'}
        </Button>
        <Link to={{ screen: 'Login' }}>
          <Button className="w-80" mode="outlined">
            VOLTAR
          </Button>
        </Link>
      </View>
      <StatusBar style="light" translucent backgroundColor="#200c10" />
    </ScrollView>
  );
};

export default SignIn;
