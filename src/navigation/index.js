import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './bottomNavigator';
import AuthScreen from '../screens/authScreens/authScreen';
import AccountStack from './stacks/AccountStack';
import AddMedicineStack from './stacks/AddMedicineStack';
import MedicinePanelStack from './stacks/MedicinePanelStack';
import HomeStack from './stacks/HomeStack';
import Logout from '../screens/otherScreens/Logout';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {saveInternetConnectivityStatus} from '../redux/action/loginAction/saveInternetConnectivity';
import {saveUserLoggedIn} from '../redux/action/loginAction/saveUserLoggedIn';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let intenetInfo;
    if (!intenetInfo) {
      intenetInfo = NetInfo.addEventListener(state => {
        dispatch(
          saveInternetConnectivityStatus(
            state.isConnected && state.isInternetReachable,
          ),
        );
      });
    }
    return () => {
      intenetInfo && intenetInfo();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const user = await GoogleSignin.getCurrentUser();
      if (user !== null) dispatch(saveUserLoggedIn(true));
    })();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, orientation: 'portrait'}}
          initialRouteName="Bottom">
          {/* <Stack.Screen name="Tab" component={BottomTabNavigation} /> */}
          <Stack.Screen name="Bottom" component={BottomNavigator} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="AddMedicineStack" component={AddMedicineStack} />
          <Stack.Screen
            name="MedicinePanelStack"
            component={MedicinePanelStack}
          />
          <Stack.Screen name="AccountStack" component={AccountStack} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="Logout" component={Logout} />
          {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
