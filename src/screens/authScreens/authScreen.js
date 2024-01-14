import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import SignUp from './signUp';
import Login from './login';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Divider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {colorPallete} from '../../components/atoms/colorPalette';
import OfflineBar from '../../components/atoms/offlineBar';
import {useSelector} from 'react-redux';
import analytics from '../../components/organisms/analytics';

const AuthScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const connected = useSelector(state => state.internetConnectivity?.data);

  useEffect(() => {
    if (isFocused) {
      GoogleSignin.configure({
        webClientId:
          '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
      });
    }
  }, [isFocused]);

  const logout = async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
  };

  return (
    <View style={styles.container}>
      <OfflineBar />
      {/* <TouchableOpacity
        style={styles.skipBtn}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={1}
        onPress={() => {
          analytics("auth_screen","authButton")
          navigation.pop();
          logout();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={20}
          color={connected ? 'gray' : 'white'}
        />
      </TouchableOpacity>
      <View style={styles.mainView}>
        <View style={styles.textContainer}>
          <Text style={styles.signUpText}>Sign in / Sign up</Text>
          <Text style={styles.content}>Sign up to access the app!</Text>
        </View>

        <SignUp navigation={navigation} logout={logout} />

        <View style={styles.dividerCont}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>Or</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.loginView}>
          <Text style={styles.loginText}>Already have an account!</Text>
        </View>
        <Login navigation={navigation} logout={logout} />
      </View>
      <Toast visibilityTime={2000} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {alignItems: 'center'},
  signUpText: {
    color: 'black',
    fontSize: 22,
  },
  content: {
    color: 'grey',
    fontSize: 16,
    paddingTop: 12,
  },
  loginView: {alignItems: 'center'},
  loginText: {
    color: 'grey',
    fontSize: 16,
  },
  dividerCont: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    color: 'grey',
    width: '6%',
  },
  dividerText: {
    paddingHorizontal: 6,
    marginVertical: 6,
    color: 'black',
  },
  skipBtn: {position: 'absolute', right: 16, top: 10},
  text: {color: 'gray', fontSize: 18},
  backBtn: {position: 'absolute', left: 16, top: 10},
  online: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colorPallete.greenPercentageColor,
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  onlineCont: {
    flexDirection: 'row',
    width: '28%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlineText: {color: 'white', fontSize: 16},
  offline: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'grey',
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  offlineCont: {
    flexDirection: 'row',
    width: '28%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offlineText: {color: 'white', fontSize: 16},
});

export default AuthScreen;
