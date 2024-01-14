import { View, Text } from 'react-native'
import React from 'react'
import { notificationStyles } from '../../styles/notificationScreenStyles/notificationPanelStyles'

const NotificationHeading = ({sender}) => {
  return (
    <View>
      <Text style={notificationStyles.headerText}>Send by {sender} :</Text>
    </View>
  )
}

export default NotificationHeading