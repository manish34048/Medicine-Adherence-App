import {View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {colorPallete} from './colorPalette';
import {useDispatch} from 'react-redux';
import {loadDeleteNotification} from '../../redux/action/notification/deleteNotificationAction';
import {loadGetAllNotification} from '../../redux/action/notification/getAllNotification';

const CloseButton = ({notificationId}) => {
  const dispatch = useDispatch();

  const deleteNotification = notificationId => {
    Alert.alert('Are you sure?', 'Click ok to proceed', [
      {
        text: 'Ok',
        onPress: () => {
          dispatch(loadDeleteNotification(notificationId));
          setTimeout(() => {
            dispatch(loadGetAllNotification(0));
          }, 2000);
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => deleteNotification(notificationId)}>
        <AntIcon
          name="close"
          color={colorPallete.redPercentageColor}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CloseButton;
