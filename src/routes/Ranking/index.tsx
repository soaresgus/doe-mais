import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RankingUserCard } from '../../components/RankingUserCard';
import { useEffect, useState } from 'react';
import { User } from '../../context/User/types';
import firestore from '@react-native-firebase/firestore';
import { Navbar } from '../../components/Navbar';

export default function Ranking() {
  const [usersRankingList, setUsersRankingList] = useState<User[]>([]);

  useEffect(() => {
    async function setRankingList() {
      const usersDocs = (
        await firestore().collection('users').where('points', '>=', 1).get()
      ).docs;
      const usersData = usersDocs.map((item) => item.data()) as User[];

      setUsersRankingList(usersData);
    }

    setRankingList();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <View className="p-4">
        <Text className="text-3xl font-bold text-black">Ranking</Text>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 200,
            display: 'flex',
            gap: 24,
          }}>
          {usersRankingList
            .sort((a, b) => (b.points || 0) - (a.points || 0))
            .map((user, index) => (
              <RankingUserCard
                imageBase64={user.avatarBase64}
                userBloodCenter={user.bloodCenter}
                userBloodType={user.bloodType}
                userName={user.fullName}
                position={index + 1}
              />
            ))}
        </ScrollView>
      </View>
      <Navbar />
    </SafeAreaView>
  );
}
