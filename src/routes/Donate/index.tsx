import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../components/Navbar';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import imageSource from '../../../assets/protocolo.png';
import { Link, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/User/useUser';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

export default function Donate() {
  const [image, setImage] = useState<string | null>();
  const [userIsAbleToDonate, setUserIsAbleToDonate] = useState(true);
  const navigation = useNavigation();
  const user = useUser();

  async function increaseUserPoints() {
    const userDoc = firestore().collection('users').doc(user.user?.email);
    const userData = (await userDoc.get()).data()!;
    const userPoints = userData.points || 0;

    await userDoc.update({ points: userPoints + 3, lastDonate: new Date() });
  }

  async function getUserLastDonate(): Promise<{
    nanoseconds: number;
    seconds: number;
  }> {
    const userDoc = firestore().collection('users').doc(user.user?.email);
    const userData = (await userDoc.get()).data()!;
    const lastDonate = userData.lastDonate;

    return lastDonate as { nanoseconds: number; seconds: number };
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);

      if (userIsAbleToDonate) {
        await increaseUserPoints();
        navigation.navigate('ConfirmDonate');
        return;
      }

      navigation.navigate('UnableToDonate');
    }
  };

  useEffect(() => {
    async function setIsAbleToDonate() {
      const lastDonate = await getUserLastDonate();

      const today = dayjs();
      const oneWeekLater = today.add(1, 'week');
      const dayjsLastDonate = dayjs(dayjs.unix(lastDonate.seconds));

      if (dayjsLastDonate.isBefore(oneWeekLater)) {
        setUserIsAbleToDonate(false);
      }
    }

    setIsAbleToDonate();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <View className="h-full flex items-center justify-center gap-4 px-2">
        <Image
          source={imageSource}
          className="w-80 h-72"
          resizeMode="contain"
        />
        <Text className="text-black text-xl font-bold text-center">
          Anexe uma foto do comprovante de doação
        </Text>
        <Link to="/Photo">
          <Button mode="outlined" onPress={pickImage}>
            ANEXAR FOTO
          </Button>
        </Link>
      </View>
      <Navbar />
    </SafeAreaView>
  );
}
