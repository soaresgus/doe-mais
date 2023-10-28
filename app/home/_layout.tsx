import { Slot } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <>
      <Slot />
      <Text>hello world 2</Text>
    </>
  );
}
