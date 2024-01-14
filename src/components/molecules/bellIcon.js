import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import {CustomAlert} from '../atoms/customAlert';

const BellIcon = ({navigation}) => {
  const load = useSelector(state => state.userInfo?.data);

  const showAlert = () => {
    CustomAlert({text1: 'Need to login first'});
  };
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          load
            ? navigation?.navigate('HomeStack', {screen: 'Notification'})
            : showAlert()
        }>
        <FontAwesomeIcon icon={faBell} color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default BellIcon;
