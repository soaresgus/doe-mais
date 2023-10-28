import { Text, View } from 'react-native';
import { RadioButton, RadioButtonProps } from 'react-native-paper';
import { BloodTypes } from '../types/BloodTypes';
import clsx from 'clsx';

interface RadioProps extends RadioButtonProps {
  label?: string;
  extendedClasses?: string;
}

export function Radio(props: RadioProps) {
  return (
    <View className={clsx(props.extendedClasses)}>
      <Text>{props.label}</Text>
      <RadioButton {...props} />
    </View>
  );
}
