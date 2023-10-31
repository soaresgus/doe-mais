import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../components/Navbar';

const Home = () => {
  const appTheme = useTheme();

  return (
    <SafeAreaView
      className="h-full justify-between"
      style={{ backgroundColor: appTheme.colors.background }}>
      <Text className="text-black">aloooo</Text>
      <Navbar />
    </SafeAreaView>
  );
};

export default Home;
