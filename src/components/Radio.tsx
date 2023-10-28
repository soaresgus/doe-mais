import { Text, View } from 'react-native';
import { RadioButton, RadioButtonItemProps } from 'react-native-paper';
import { BloodTypes } from '../types/BloodTypes';
import clsx from 'clsx';

interface RadioProps extends RadioButtonItemProps {
  extendedClasses?: string;
}

export function Radio(props: RadioProps) {
  return (
    <View className={clsx(props.extendedClasses)}>
      <RadioButton.Item {...props} />
    </View>
  );
}
