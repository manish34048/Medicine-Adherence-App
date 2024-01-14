import {View, Text} from 'react-native';
import React from 'react';
import {notificationStyles} from '../../styles/notificationScreenStyles/notificationPanelStyles';

const NotificationMessage = ({text, date, time}) => {
  return (
    <View style={{padding: 10}}>
      <Text style={notificationStyles.messageText}>{text}</Text>
      <Text style={notificationStyles.dateText}>{date}</Text>
      <Text style={notificationStyles.dateText}>{time}</Text>
    </View>
  );
};

export default NotificationMessage;
