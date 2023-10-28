import clsx from 'clsx';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

interface InputProps extends TextInputProps {
  extendedClasses?: string;
}

export function Input(props: InputProps) {
  const appTheme = useTheme();

  return (
    <TextInput
      className={clsx('h-auto rounded-t-md', props.extendedClasses)}
      underlineColor={appTheme.colors.primary}
      activeOutlineColor={appTheme.colors.primary}
      activeUnderlineColor={appTheme.colors.primary}
      placeholderTextColor={appTheme.colors.primary}
      textColor={appTheme.colors.primary}
      {...props}
    />
  );
}
