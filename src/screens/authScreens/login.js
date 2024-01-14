import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {styles} from '../../styles/authScreensStyles/loginScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginRequest,
  resetLogin,
} from '../../redux/action/loginAction/loginAction';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import {saveUserLoggedIn} from '../../redux/action/loginAction/saveUserLoggedIn';
import {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from '../../components/atoms/customToast';
import {HTTP_STATUS_CODES, serverErrors} from '../../constants/statusCodes';

const Login = ({navigation, logout}) => {
  const result = useSelector(state => state.signIn?.data);
  const error = useSelector(state => state.signIn?.error);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getResponse = async () => {
    if (result?.status === 200) {
      let res = result?.data;
      await AsyncStorage.setItem('user_id', res.userList[0].id);
      await AsyncStorage.setItem('user_name', res.userList[0].userName);
      await AsyncStorage.setItem('user_email', res.userList[0].email);
      await AsyncStorage.setItem('refreshToken', res?.refreshToken);
      // let token = encryptData(res?.accessToken);
      await AsyncStorage.setItem('accessToken', res?.accessToken);

      await AsyncStorage.setItem(
        'user_photo',
        res?.userList[0].userDetails.picPath,
      );
      await AsyncStorage.setItem('loginDate', res.userList[0].lastLogin);
      dispatch(saveUserLoggedIn(true));
      SuccessToast({text1: 'Logged In Successfully'});
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2500);
    } else {
      logout();
      InfoToast({text1: 'Error While Login'});
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (result?.status === HTTP_STATUS_CODES.ok) {
        getResponse();
      }
      dispatch(resetLogin());
    }
  }, [isFocused, result]);

  useEffect(() => {
    if (isFocused) {
      if (error === serverErrors.NOT_FOUND) {
        logout();
        ErrorToast({text1: 'User Not Found'});
      }
      if (error === serverErrors.SERVER_ERROR) {
        logout();
        InfoToast({text1: 'Something Went Wrong', text1: 'Try Again Later'});
      }
      dispatch(resetLogin());
    }
  }, [isFocused, error]);

  const login = async () => {
    if (connected) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const token = await messaging().getToken();
        const {email} = userInfo.user;

        dispatch(loginRequest({email, token}));
      } catch (err) {
        if (await GoogleSignin.isSignedIn()) {
          await GoogleSignin.signOut();
        }
      }
    }
  };

  return (
    <View style={styles.signInCont}>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => login()}
      />
    </View>
  );
};

export default Login;
