import {View} from 'react-native';
import React from 'react';
import {notificationStyles} from '../../styles/notificationScreenStyles/notificationPanelStyles';
import NotificationHeading from '../atoms/notificationHeading';
import NotificationMessage from '../atoms/notificationMessage';
import CloseButton from '../atoms/closeButton';
import BellIcon from '../atoms/bellIcon';
import {colorPallete} from '../atoms/colorPalette';

const NotificationCard = ({text, date, time, notificationId, sender}) => {
  return (
    <View
      style={{
        width: '98%',
        borderColor: colorPallete.appColor,
        backgroundColor: colorPallete.basicColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 4,
      }}>
      <View style={notificationStyles.cardHeader}>
        <NotificationHeading sender={sender} />
        <CloseButton notificationId={notificationId} />
      </View>
      <View style={notificationStyles.cardMessage}>
        <BellIcon />
        <NotificationMessage text={text} date={date} time={time} />
      </View>
    </View>
  );
};

export default NotificationCard;
