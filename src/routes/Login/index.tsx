import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import logoSrc from '../../../assets/logo.png';

import { Button, useTheme } from 'react-native-paper';
import { Input } from '../../components/Input';
import { Link } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const appTheme = useTheme();

  const loginFormSchema = z.object({
    email: z
      .string()
      .email('Formato de e-mail inválido')
      .min(1, 'Campo obrigatório'),
    password: z.string().min(1, 'Campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const login = (data: any) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <View className="h-full bg-[#200c10]">
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          paddingTop: 50,
          paddingBottom: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appTheme.colors.darkPrimary,
        }}>
        <Image source={logoSrc} className="w-80 h-40" resizeMode="contain" />
        <View className="flex gap-4">
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
                  extendedClasses="w-80"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-lg text-red-500">
                {errors.email.message}
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
                  extendedClasses="w-80"
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-lg text-red-500">
                {errors.password?.message}
              </Text>
            )}
          </View>

          <Button
            className="w-80"
            mode="outlined"
            loading={isLoading}
            onPress={isLoading ? () => {} : handleSubmit(login)}>
            {!isLoading && 'ENTRAR'}
          </Button>

          <Link to={{ screen: 'ForgotPassword' }}>
            <Text style={{ color: appTheme.colors.primaryContainer }}>
              Esqueci minha senha
            </Text>
          </Link>

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
      </ScrollView>
    </View>
  );
};

export default Login;
