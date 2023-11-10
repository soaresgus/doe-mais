import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmDonate() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-full">
      <View className="h-full flex gap-4 justify-center items-center p-4">
        <Text className="text-center text-2xl text-black font-bold">
          Muito obrigado pela sua doação!
        </Text>
        <Text
          className="text-center text-xl"
          style={{ color: theme.colors.primary }}>
          Você recebeu 3 pontos por essa doação
        </Text>

        <Button mode="outlined" onPress={() => navigation.navigate('Home')}>
          VOLTAR
        </Button>
      </View>
    </SafeAreaView>
  );
}
