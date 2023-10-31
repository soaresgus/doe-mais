import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Icon, useTheme } from 'react-native-paper';

export function Navbar() {
  const appTheme = useTheme();

  return (
    <View
      className="w-full h-20 items-center justify-between pr-5 pl-4 pt-2 flex-row"
      style={{ backgroundColor: appTheme.colors.darkPrimary }}>
      <TouchableOpacity activeOpacity={0.8} className="w-16 h-16 items-center">
        <Icon source="home" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Início</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} className="w-16 h-16 items-center">
        <Icon source="finance" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Ranking</Text>
      </TouchableOpacity>

      <View
        className="w-20 h-20 rounded-full mb-12"
        style={{ backgroundColor: appTheme.colors.darkPrimary }}>
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-20 h-20 pt-2 items-center">
          <Icon source="water-plus" size={48} color="#fff" />
          <Text className="text-lg text-white font-medium">Doar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.8} className="w-16 h-16 items-center">
        <Icon source="domain" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Postos</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} className="w-16 h-16 items-center">
        <Icon source="account" size={36} color="#fff" />
        <Text className="text-sm text-white font-medium">Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
