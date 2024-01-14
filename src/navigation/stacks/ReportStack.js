import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Report from '../../screens/userScreens/report/report';

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Report"
      screenOptions={{headerShown: false, orientation: 'portrait'}}>
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};

export default ReportStack;
