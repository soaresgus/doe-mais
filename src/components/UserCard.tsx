import { Alert, Image, Text, View } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../context/User/useUser';
import { useEffect, useState } from 'react';

interface UserCardProps {
  imageBase64: string;
  userName: string;
  userEmail: string;
  userBloodType: string;
  userBloodCenter: string;
  isAlert?: boolean;
}

export function UserCard(props: UserCardProps) {
  const user = useUser();
  const theme = useTheme();

  const [userNotificationsCount, setUserNotificationsCount] = useState(0);

  const getNotificationsCount = async (email: string) => {
    const notificationsDocs = await firestore()
      .collection('alerts')
      .where('whoNotifies', '==', user.user?.email)
      .where('whoReceived', '==', email)
      .get();

    const notificationsData = notificationsDocs.docs.map((item) => item.data());
    const notificationsCount = notificationsData.length;

    return notificationsCount;
  };

  async function setNotificationsCount() {
    const notificationsCount = await getNotificationsCount(props.userEmail);

    setUserNotificationsCount(notificationsCount);
  }

  const notifyUser = async (email: string) => {
    const notificationsCount = await getNotificationsCount(email);

    if (notificationsCount <= 0) {
      await firestore().collection('alerts').add({
        whoNotifies: user.user?.email,
        whoReceived: email,
      });
    }

    Alert.alert('Usuário notificado com sucesso!');

    setNotificationsCount();
  };

  useEffect(() => {
    setNotificationsCount();
  }, []);

  return (
    <Surface elevation={4} className="p-4 rounded-lg">
      <View className="flex items-center justify-around flex-row gap-4">
        <Image
          source={{ uri: props.imageBase64 }}
          className="rounded-full w-[100px] h-[100px]"
          resizeMode="cover"
        />
        <View className="flex gap-1">
          <Text className="text-lg font-bold">{props.userName}</Text>
          <Text className="text-lg">Tipo Sanguíneo: {props.userBloodType}</Text>
          <Text className="text-md">Hemocentro: {props.userBloodCenter}</Text>
          {props.isAlert && (
            <>
              {userNotificationsCount <= 0 ? (
                <Button
                  mode="outlined"
                  onPress={() => notifyUser(props.userEmail)}>
                  Notificar
                </Button>
              ) : (
                <Text
                  style={{ color: theme.colors.primary }}
                  className="font-bold mt-2">
                  Usuário já notificado
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </Surface>
  );
}
