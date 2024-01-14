import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {CustomAlert} from '../atoms/customAlert';
import { colorPallete } from './colorPalette';
import Analytics from '../organisms/analytics';

const AddAppointment = ({navigation, routeName, doctorNameList}) => {
  const showAlert = () => {
    CustomAlert({text1: 'Add Medicine and Prescription Together'});
  };

  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (doctorNameList !== null && doctorNameList.length !== 0) {
            navigation.navigate(routeName, {doctorNameList: doctorNameList});
          } else {
            showAlert();
          }
        Analytics("Appointment Reminders","Add Appointment")
        }}>
        <EvilIcons name="plus" color={colorPallete.basicColor} size={38} />
      </TouchableOpacity>
    </View>
  );
};

export default AddAppointment;
