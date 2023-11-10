import { Alert, Image, Text, View } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../context/User/useUser';
import { useEffect, useState } from 'react';

interface RankingUserCardProps {
  imageBase64: string;
  userName: string;
  userBloodType: string;
  userBloodCenter: string;
  position: number;
}

export function RankingUserCard(props: RankingUserCardProps) {
  return (
    <Surface elevation={4} className="p-4 rounded-lg">
      <View className="flex items-center justify-around flex-row gap-4">
        <Text className="text-3xl font-bold">{props.position}º</Text>
        <Image
          source={{ uri: props.imageBase64 }}
          className="rounded-full w-[100px] h-[100px]"
          resizeMode="cover"
        />
        <View className="flex gap-1">
          <Text className="text-lg font-bold">{props.userName}</Text>
          <Text className="text-lg">Tipo Sanguíneo: {props.userBloodType}</Text>
          <Text className="text-md">Hemocentro: {props.userBloodCenter}</Text>
        </View>
      </View>
    </Surface>
  );
}
