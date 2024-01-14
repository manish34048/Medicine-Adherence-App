import Toast from 'react-native-toast-message';

export const SuccessToast = ({text1, text2, position}) => {
  Toast.show({
    text1: text1,
    text2: text2,
    position: position,
    type: 'success',
  });
};

export const ErrorToast = ({text1, text2, position}) => {
  Toast.show({
    text1: text1,
    text2: text2,
    position: position,
    type: 'error',
  });
};

export const InfoToast = ({text1, text2, position}) => {
  Toast.show({
    text1: text1,
    text2: text2,
    position: position,
    type: 'info',
  });
};
