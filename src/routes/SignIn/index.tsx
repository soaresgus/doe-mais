import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ActivityIndicator,
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
import cep from 'cep-promise';
import { useMaskedInputProps } from 'react-native-mask-input';
import states from '../../models/states.json';
import ModalDropdown from 'react-native-modal-dropdown';

const statesAcronyms = states.estados.map((item) => item.sigla);

const dropdownRenderRow = (rowData: any, rowID: any, highlighted: any) => {
  let evenRow = rowID % 2;
  return (
    <TouchableHighlight underlayColor="cornflowerblue">
      <View
        style={[
          styles.dropdown_row,
          { backgroundColor: evenRow ? 'lemonchiffon' : 'white' },
        ]}
      >
        <Text
          style={[
            styles.dropdown_row_text,
            highlighted && { color: 'mediumaquamarine' },
          ]}
        >
          {`${rowData.name} (${rowData.age})`}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const dropdownRenderSeparator = (
  sectionID: any,
  rowID: any,
  adjacentRowHighlighted: any
) => {
  let key = `spr_${rowID}`;
  return <View style={styles.dropdown_separator} key={key} />;
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    number: z.number(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
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
      street: '',
      neighborhood: '',
      city: '',
      number: '',
    },
  });

  const [cepState, setCepState] = useState('');
  const [state, setState] = useState('');

  const appTheme = useTheme();

  const fetchCep = async (cepValue: string) => {
    setIsLoadingCep(true);
    const result = await cep(cepValue);

    setValue('street', result.street);
    setValue('city', result.city);
    setState(result.state);
    setValue('neighborhood', result.neighborhood);

    setIsLoadingCep(false);
  };

  const onCepInputChanged = async (cepValue: string) => {
    setCepState(cepValue);
    if (cepValue.length >= 9) {
      await fetchCep(cepValue);
    }
  };

  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  const cepMaskedInputProps = useMaskedInputProps({
    value: cepState,
    onChangeText: onCepInputChanged,
    mask: cepMask,
  });

  const dropdownRenderButtonText = (rowData: any) => {
    const { name, age } = rowData;
    return `${name} - ${age}`;
  };

  const createUser = (data: any) => {
    console.log(data);
  };

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

        <View className="flex-row mr-8 gap-4 items-center justify-center">
          <Input label="CEP" extendedClasses="w-60" {...cepMaskedInputProps} />
          {isLoadingCep && <ActivityIndicator />}
        </View>

        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Logradouro"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="street"
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
                label="Número"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="number"
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
                label="Bairro"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="neighborhood"
          />
        </View>

        <View>
          <ModalDropdown
            style={styles.dropdown}
            textStyle={styles.dropdown_text}
            dropdownStyle={styles.dropdown_dropdown}
            options={statesAcronyms}
            renderButtonText={(rowData: any) =>
              dropdownRenderButtonText(rowData)
            }
            renderRow={(rowData: any, rowID: any, highlighted: any) =>
              dropdownRenderRow(rowData, rowID, highlighted)
            }
            renderSeparator={(
              sectionID: any,
              rowID: any,
              adjacentRowHighlighted: any
            ) =>
              dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted)
            }
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
                label="Cidade"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="city"
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

const styles = StyleSheet.create({
  dropdown: {
    alignSelf: 'flex-end',
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_dropdown: {
    width: 150,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
});

export default SignIn;
