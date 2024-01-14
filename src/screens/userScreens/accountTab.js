import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import TwoTouchable from '../../components/molecules/twoTouchable';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  faUserNurse,
  faUserDoctor,
  faStopwatch,
  faGear,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/otherScreensStyles/accountTabStyles';
import {Divider} from 'react-native-paper';
import CustomButton from '../../components/atoms/customButton';
import PushNotification from 'react-native-push-notification';

const AccountTab = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('Please Login First');
  const [img, imgstate] = useState('');

  useFocusEffect(() => {
    async function checkforlog() {
      const checkforlogin = await AsyncStorage.getItem('user_id');
      if (checkforlogin !== null) {
        setName(await AsyncStorage.getItem('user_name'));
        imgstate(await AsyncStorage.getItem('user_photo'));
        setIsLoggedIn(true);
      }
    }
    checkforlog();
    return () => {};
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader title={'Account'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('AccountStack', {screen: 'EditProfile'})
              : navigation.navigate('AuthScreen');
          }}>
          {isLoggedIn ? (
            <View style={styles.profileView}>
            <View style={styles.profile}>
              <Image source={{uri: img}} style={styles.img} />
              <View style={styles.heading}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle}>See your profile</Text>
              </View>
            </View>
            </View>
          ) : (
            <View style={styles.profile}>
              <Image
                source={require('../../assets/images/nouser.png')}
                style={styles.img}
              />
              <View style={styles.heading}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle}>See your profile</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.card}>
          <Divider style={styles.divider} />
          <TwoTouchable
            icon={faUserNurse}
            title="My Caretaker"
            navigationTitle="CareTaker"
            navigation={navigation}
          />
          <Divider style={styles.divider} />
          <TwoTouchable
            icon={faHospitalUser}
            title="My Patients"
            navigation={navigation}
            navigationTitle="Patient"
          />
          <Divider style={styles.divider} />
          <TwoTouchable
            icon={faUserDoctor}
            title="Prescriptions"
            navigationTitle="Prescriptions"
            navigation={navigation}
          />
          <Divider style={styles.divider} />

          <TwoTouchable
            icon={faStopwatch}
            title="Appointment Reminders"
            navigation={navigation}
            navigationTitle="AppointmentReminderList"
          />
          <Divider style={styles.divider} />

          <TwoTouchable
            icon={faGear}
            title="Settings"
            navigation={navigation}
            navigationTitle="Settings"
          />
          <Divider style={styles.divider} />
        </View>

        {isLoggedIn ? (
          <CustomButton
            title={'Logout'}
            btnStyles={styles.btnStyles}
            contStyles={styles.contStyles}
            handleSubmit={() => {
              PushNotification.cancelAllLocalNotifications();
              imgstate(require('../../assets/images/nouser.png'));
              setName('Please Login First');
              setIsLoggedIn(false);
              navigation.navigate('Logout');
            }}
          />
        ) : (
          <CustomButton
            title={'Login'}
            btnStyles={styles.btnStyles}
            contStyles={styles.contStyles}
            handleSubmit={() => navigation.navigate('AuthScreen')}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AccountTab;
