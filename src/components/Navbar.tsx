import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Icon, useTheme } from 'react-native-paper';

export function Navbar() {
  const appTheme = useTheme();

  const navigation = useNavigation();

  const changeScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const openNavigator = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.error('Não foi possível abrir a URL.');
      }
    } catch (erro) {
      console.error('Ocorreu um erro ao abrir a URL: ', erro);
    }
  };

  const bloodCentersUrl = 'https://www.prosangue.sp.gov.br/hemocentros/';

  return (
    <View
      className="w-full h-20 items-center justify-between pr-5 pl-4 pt-2 flex-row absolute bottom-0 z-10"
      style={{ backgroundColor: appTheme.colors.darkPrimary }}>
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-16 h-16 items-center"
        onPress={() => changeScreen('Home')}>
        <Icon source="home" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        className="w-16 h-16 items-center"
        onPress={() => changeScreen('Donate')}>
        <Icon source="water-plus" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Doar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        className="w-16 h-16 items-center"
        onPress={() => changeScreen('Ranking')}>
        <Icon source="finance" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        className="w-16 h-16 items-center"
        onPress={() => openNavigator(bloodCentersUrl)}>
        <Icon source="domain" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Postos</Text>
      </TouchableOpacity>
    </View>
  );
}
