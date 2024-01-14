import React from 'react';
import HomeScreen from '../../screens/userScreens/homeScreen';
import Report from '../../screens/userScreens/report/report';
import AddMedicineLocal from '../../screens/userScreens/medicines/addMedicineLocal';
import MedicinePanel from '../../screens/userScreens/medicines/medicinePanel';
import AccountTab from '../../screens/userScreens/accountTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  faCapsules,
  faCircleUser,
  faFileContract,
  faHouseMedical,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import {colorPallete} from '../../components/atoms/colorPalette';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHouseMedical}
              size={focused ? 34 : 24}
              color={focused ? colorPallete.appColor : colorPallete.darkGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faFileContract}
              size={focused ? 34 : 24}
              color={focused ? colorPallete.appColor : colorPallete.darkGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddMedicineLocal}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCirclePlus}
              size={focused ? 34 : 24}
              color={focused ? colorPallete.appColor : colorPallete.darkGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medicine"
        component={MedicinePanel}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCapsules}
              size={focused ? 34 : 24}
              color={focused ? colorPallete.appColor : colorPallete.darkGrey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountTab}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCircleUser}
              size={focused ? 34 : 24}
              color={focused ? colorPallete.appColor : colorPallete.darkGrey}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
