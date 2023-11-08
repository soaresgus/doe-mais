import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../components/Navbar';

const ComingSoon = () => {
  const appTheme = useTheme();

  return (
    <SafeAreaView
      className="h-full justify-between"
      style={{ backgroundColor: appTheme.colors.background }}>
      <View className="h-full flex justify-center items-center">
        <Text className="text-black text-lg font-bold text-center">
          Funcionalidade em desenvolvimento
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ComingSoon;
