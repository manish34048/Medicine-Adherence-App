import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/userScreens/homeScreen';
import Report from '../../screens/userScreens/report/report';
import AddMedicineLocal from '../../screens/userScreens/medicines/addMedicineLocal';
import MedicinePanel from '../../screens/userScreens/medicines/medicinePanel';
import AccountTab from '../../screens/userScreens/accountTab';
import {colorPallete} from '../../components/atoms/colorPalette';
import {
  faCapsules,
  faCircleUser,
  faFileContract,
  faHouseMedical,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = faHouseMedical;
            color = focused ? colorPallete.appColor : colorPallete.darkGrey;
            size = focused ? 34 : 24;
          } else if (route.name === 'Report') {
            iconName = faFileContract;
            color = focused ? colorPallete.appColor : colorPallete.darkGrey;
            size = focused ? 34 : 24;
          } else if (route.name === 'Add') {
            iconName = faCirclePlus;
            color = focused ? colorPallete.appColor : colorPallete.darkGrey;
            size = focused ? 34 : 24;
          } else if (route.name === 'Medicine') {
            iconName = faCapsules;
            color = focused ? colorPallete.appColor : colorPallete.darkGrey;
            size = focused ? 34 : 24;
          } else if (route.name === 'Account') {
            iconName = faCircleUser;
            color = focused ? colorPallete.appColor : colorPallete.darkGrey;
            size = focused ? 34 : 24;
          }
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName="Home"
      backBehavior="history">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Add" component={AddMedicineLocal} />
      <Tab.Screen name="Medicine" component={MedicinePanel} />
      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
