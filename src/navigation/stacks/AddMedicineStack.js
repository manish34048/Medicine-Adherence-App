import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddMedicineLocal from '../../screens/userScreens/medicines/addMedicineLocal';
import AddPrescription from '../../screens/userScreens/medicines/addPrescription';
import AddPrescriptionPanel from '../../screens/userScreens/medicines/addPrescriptionPanel';

const Stack = createNativeStackNavigator();

const AddMedicineStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}>
      <Stack.Screen name="AddMedicineLocal" component={AddMedicineLocal} />
      <Stack.Screen name="AddPrescription" component={AddPrescription} />
      <Stack.Screen
        name="AddPrescriptionPanel"
        component={AddPrescriptionPanel}
      />
    </Stack.Navigator>
  );
};

export default AddMedicineStack;
