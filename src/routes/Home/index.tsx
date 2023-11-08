import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navbar } from '../../components/Navbar';
import { useUser } from '../../context/User/useUser';
import { UserCard } from '../../components/UserCard';
import firestore from '@react-native-firebase/firestore';
import { User } from '../../context/User/types';

const Home = () => {
  const appTheme = useTheme();
  const user = useUser();

  const [allDonatorsUsers, setAllDonatorsUsers] = useState<User[]>([]);
  const [allUsersWhoNotified, setAllUsersWhoNotified] = useState<User[]>([]);

  useEffect(() => {
    async function getAllDonatorsUsers() {
      const docs = await firestore()
        .collection('users')
        .where('userType', '==', 'doador')
        .get();

      const data = docs.docs.map((item) => item.data());

      setAllDonatorsUsers(data as User[]);
    }

    async function getAllNotifiedUsers() {
      const docs = await firestore()
        .collection('alerts')
        .where('whoReceived', '==', user.user?.email)
        .get();

      const data = docs.docs.map((item) => item.data());
      const whoNotifiesEmailList = data.map((item) => item.whoNotifies);

      whoNotifiesEmailList.forEach(async (email) => {
        const userDoc = await firestore()
          .collection('users')
          .where('email', '==', email)
          .get();

        const data = userDoc.docs.map((item) => item.data())[0];
        setAllUsersWhoNotified((value) => {
          if (!value.includes(data as User)) {
            return [...value, data] as User[];
          }

          return value as User[];
        });
      });
    }

    getAllNotifiedUsers();
    getAllDonatorsUsers();
  }, []);

  return (
    <SafeAreaView
      className="h-full"
      style={{ backgroundColor: appTheme.colors.background }}>
      <View className="p-4 flex gap-4">
        <Surface elevation={4} className="p-4 rounded-lg">
          <Text className="text-black font-bold text-2xl">
            Doações realizadas
          </Text>

          <Text
            style={{ color: appTheme.colors.primary }}
            className="font-bold text-xl">
            0
          </Text>
        </Surface>

        {user.user?.userType === 'necessita' && (
          <View>
            <Text className="text-black font-bold text-2xl">
              Usuários para notificar
            </Text>

            <ScrollView
              contentContainerStyle={{
                paddingBottom: 400,
                display: 'flex',
                gap: 24,
              }}>
              {allDonatorsUsers.map((item) => (
                <UserCard
                  userName={item.fullName}
                  userEmail={item.email}
                  imageBase64={item.avatarBase64}
                  userBloodType={item.bloodType}
                  userBloodCenter={item.bloodCenter}
                  isAlert
                  key={item.id}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {user.user?.userType === 'doador' && (
          <View>
            <Text className="text-black font-bold text-2xl">
              Usuários que te notificou
            </Text>

            <ScrollView
              contentContainerStyle={{
                paddingBottom: 400,
                display: 'flex',
                gap: 24,
              }}>
              {allUsersWhoNotified.map((item) => (
                <UserCard
                  userName={item.fullName}
                  userEmail={item.email}
                  imageBase64={item.avatarBase64}
                  userBloodType={item.bloodType}
                  userBloodCenter={item.bloodCenter}
                  key={item.id}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

export default Home;
