import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/userScreens/notificationScreen';
import SendSnapToCaretaker from '../../screens/otherScreens/sendSnapToCaretaker';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}>
      {/* <Stack.Screen name="Homescreen" component={HomeScreen} /> */}
      <Stack.Screen
        name="SendSnapToCaretaker"
        component={SendSnapToCaretaker}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
