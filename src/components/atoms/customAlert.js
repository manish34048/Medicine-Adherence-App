import {Alert} from 'react-native';

export const CustomAlert = ({text1, text2, onPress}) => {
  Alert.alert(
    text1,
    text2,
    [
      {
        text: 'Ok',
        onPress: onPress,
      },
    ],
  );
};
