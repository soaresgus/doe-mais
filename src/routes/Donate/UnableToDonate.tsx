import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnableToDonate() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-full">
      <View className="h-full flex items-center justify-center gap-4 px-2">
        <Text className="text-black text-xl font-bold text-center">
          Aguarde ao menos uma semana para doar novamente no aplicativo.
        </Text>
        <Button mode="outlined" onPress={() => navigation.navigate('Home')}>
          VOLTAR
        </Button>
      </View>
    </SafeAreaView>
  );
}
