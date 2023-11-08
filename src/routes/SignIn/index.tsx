import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  PaperProvider,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { Input } from '../../components/Input';
import logoSrc from '../../../assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import { BloodTypes } from '../../types/BloodTypes';
import { Radio } from '../../components/Radio';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import cep from 'cep-promise';
import { useMaskedInputProps } from 'react-native-mask-input';
import states from '../../models/states.json';
import Carousel from 'react-native-snap-carousel';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import figura1 from '../../../assets/figures/person-1.png';
import figura2 from '../../../assets/figures/person-2.png';
import figura3 from '../../../assets/figures/person-3.png';
import figura4 from '../../../assets/figures/person-4.png';
import figura5 from '../../../assets/figures/person-5.png';
import figura6 from '../../../assets/figures/person-6.png';
import figura7 from '../../../assets/figures/person-7.png';
import figura8 from '../../../assets/figures/person-8.png';
import figura9 from '../../../assets/figures/person-9.png';
import figura10 from '../../../assets/figures/person-10.png';
import figura11 from '../../../assets/figures/person-11.png';
import figura12 from '../../../assets/figures/person-12.png';
import figura13 from '../../../assets/figures/person-13.png';
import figura14 from '../../../assets/figures/person-14.png';
import figura15 from '../../../assets/figures/person-15.png';
import figura16 from './';
import { useUser } from '../../context/User/useUser';
import { User } from '../../context/User/types';

const statesAcronyms = states.estados.map((item) => {
  return { acronym: item.sigla, state: item.nome, city: item.cidades };
});

const SignIn = () => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

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
    bloodCenter: z.string().min(1, 'Campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
      bloodType: 'A+',
      userType: 'doador',
      bloodCenter: '',
    },
  });

  const [image, setImage] = useState<string>('');
  const user = useUser();

  const appTheme = useTheme();
  const navigation = useNavigation();

  const dropdownRenderButtonText = (rowData: any) => {
    const { name, age } = rowData;
    return `${name} - ${age}`;
  };

  const createUser = async (data: any) => {
    const userData = {
      avatarBase64: image || '',
      bloodType: data.bloodType || '',
      email: data.email || '',
      fullName: data.name || '',
      userType: data.userType || 'doador',
      bloodCenter: data.bloodCenter || '',
    } as User;
    await user.createUser(userData, data.password);
    navigation.navigate('Login');
  };

  const figures = [
    {
      id: '1',
      figura: figura1,
      src: '../../../assets/figures/person-1.png',
    },
    {
      id: '2',
      figura: figura2,
      src: '../../../assets/figures/person-2.png',
    },
    {
      id: '3',
      figura: figura3,
      src: '../../../assets/figures/person-3.png',
    },
    {
      id: '4',
      figura: figura4,
      src: '../../../assets/figures/person-4.png',
    },
    {
      id: '5',
      figura: figura5,
      src: '../../../assets/figures/person-5.png',
    },
    {
      id: '6',
      figura: figura6,
      src: '../../../assets/figures/person-6.png',
    },
    {
      id: '7',
      figura: figura7,
      src: '../../../assets/figures/person-7.png',
    },
    {
      id: '8',
      figura: figura8,
      src: '../../../assets/figures/person-8.png',
    },
    {
      id: '9',
      figura: figura9,
      src: '../../../assets/figures/person-9.png',
    },
    {
      id: '10',
      figura: figura10,
      src: '../../../assets/figures/person-10.png',
    },
    {
      id: '11',
      figura: figura11,
      src: '../../../assets/figures/person-11.png',
    },
    {
      id: '12',
      figura: figura12,
      src: '../../../assets/figures/person-12.png',
    },
    {
      id: '13',
      figura: figura13,
      src: '../../../assets/figures/person-13.png',
    },
    {
      id: '14',
      figura: figura14,
      src: '../../../assets/figures/person-14.png',
    },
    {
      id: '15',
      figura: figura15,
      src: '../../../assets/figures/person-15.png',
    },
    {
      id: '16',
      figura: figura16,
      src: './',
    },
  ];

  const changeAvatarImage = async (index: number) => {
    const figurePath = figures[index].src
      .replace('../../../', '')
      .replace('./', '');

    const [{ localUri }] = await Asset.loadAsync(figures[index].figura);

    try {
      const fileInfo = await FileSystem.getInfoAsync(localUri);

      if (fileInfo.exists) {
        const base64String = await FileSystem.readAsStringAsync(localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const base64 = `data:image/png;base64,${base64String}`;

        setImage(base64);
      } else {
        console.error('Arquivo da imagem não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao ler o arquivo da imagem:', error);
    }
  };

  const carouselItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <Image
          source={figures[index].figura}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    );
  };

  useEffect(() => {
    changeAvatarImage(0);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        paddingTop: 80,
        paddingBottom: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appTheme.colors.darkPrimary,
      }}>
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
                label="Hemocentro"
              />
            )}
            name="bloodCenter"
          />
          {errors.bloodCenter && (
            <Text className="text-[16px] text-red-500">
              {errors.bloodCenter?.message}
            </Text>
          )}
        </View>

        <Text className="text-white text-xl font-medium">
          Escolha seu avatar
        </Text>

        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Carousel
              layout="default"
              data={figures}
              renderItem={carouselItem}
              sliderWidth={160}
              itemWidth={160}
              onSnapToItem={(value) => {
                changeAvatarImage(value);
              }}
            />
          </View>
        </SafeAreaView>

        <Button
          className="w-80"
          mode="outlined"
          loading={user.isLoading}
          onPress={user.isLoading ? () => {} : handleSubmit(createUser)}>
          {!user.isLoading && 'CRIAR'}
        </Button>

        <Link to={{ screen: 'Login' }}>
          <Button mode="outlined" className="w-full">
            VOLTAR
          </Button>
        </Link>
      </View>
      <StatusBar style="light" translucent backgroundColor="#200c10" />
    </ScrollView>
  );
};

export default SignIn;
