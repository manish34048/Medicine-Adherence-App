import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountTab from '../../screens/userScreens/accountTab';
import CareTaker from '../../screens/userScreens/careTaker/careTaker';
import Patients from '../../screens/userScreens/patients/patients';
import PatientProfile from '../../screens/userScreens/patients/patientProfile';
import CareTakerProfile from '../../screens/userScreens/careTaker/careTakerProfile';
import SearchScreen from '../../components/organisms/searchScreen';
import Settings from '../../screens/otherScreens/settings';
import About from '../../screens/otherScreens/aboutApp';
import SavedDetails from '../../screens/profile/savedDetails';
import EditProfile from '../../screens/profile/editProfile';
import DoctorPrescription from '../../screens/otherScreens/doctorPrescription';
import ViewPrescriptions from '../../screens/userScreens/patients/viewPrescriptions';
import ViewMedicines from '../../screens/userScreens/patients/viewMedicines';
import MedicineReport from '../../screens/userScreens/patients/medicineReport';
import MedicineImages from '../../screens/userScreens/patients/medicineImages';
import SaveAppointment from '../../screens/otherScreens/saveAppointment';
import AppointmentReminderList from '../../screens/otherScreens/appointmentReminderList';
import Prescriptions from '../../screens/otherScreens/prescriptions';
import Feedback from '../../screens/otherScreens/feedback';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}>
      <Stack.Screen name="AccountScreen" component={AccountTab} />
      <Stack.Screen name="CareTaker" component={CareTaker} />
      <Stack.Screen name="Patient" component={Patients} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="CareTakerProfile" component={CareTakerProfile} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="SavedDetails" component={SavedDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Prescriptions" component={Prescriptions} />
      <Stack.Screen name="ViewPrescription" component={DoctorPrescription} />
      <Stack.Screen name="PatientPrescriptions" component={ViewPrescriptions} />
      <Stack.Screen name="PatientMedicines" component={ViewMedicines} />
      <Stack.Screen name="MedicineReport" component={MedicineReport} />
      <Stack.Screen name="MedicineImages" component={MedicineImages} />
      <Stack.Screen name="SaveAppointment" component={SaveAppointment} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen
        name="AppointmentReminderList"
        component={AppointmentReminderList}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
