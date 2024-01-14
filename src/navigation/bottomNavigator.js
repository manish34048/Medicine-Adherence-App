import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/userScreens/homeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Ripple from 'react-native-material-ripple';
import {
  faCapsules,
  faCircleUser,
  faFileContract,
  faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';
import AddMedicineLocal from '../screens/userScreens/medicines/addMedicineLocal';
import AccountTab from '../screens/userScreens/accountTab';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import AddButton from '../components/atoms/addButton';
import {styles} from '../styles/navigationStyles';
import Report from '../screens/userScreens/report/report';
import {colorPallete} from '../components/atoms/colorPalette';

const TabBar = [
  {route: 'Home', component: HomeScreen, iconName: faHouseMedical},
  {route: 'Report', component: Report, iconName: faFileContract},
  {route: 'Add', component: AddMedicineLocal},
  {route: 'Medicine', component: MedicinePanel, iconName: faCapsules},
  {route: 'Account', component: AccountTab, iconName: faCircleUser},
];
const Tab = createBottomTabNavigator();

const BottomNavigator = ({navigation}) => {
  const TabBarButton = props => {
    const {onPress, accessibilityState, item} = props;
    const focused = accessibilityState.selected;
    let size = 26;
    let colors = focused
      ? colorPallete.appColor
      : colorPallete.colorTabsOutline;
    return (
      <Ripple
        onPress={onPress}
        style={styles.ripple}
        rippleCentered={true}
        rippleColor={colorPallete.colorTabs}
        rippleDuration={700}
        rippleOpacity={0.87}
        rippleContainerBorderRadius={400}>
        <FontAwesomeIcon icon={item.iconName} size={size} color={colors} />
        {focused ? (
          <Text style={styles.focused}>{item.route}</Text>
        ) : (
          <Text style={styles.notFocused}>{item.route}</Text>
        )}
      </Ripple>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPallete.basicColor,
          paddingHorizontal: 16,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        lazy: false,
      }}
      backBehavior="firstRoute"
      initialRouteName="Home">
      {TabBar.map((item, index) => {
        if (item.route === 'Add') {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarIcon: () => (
                  <View style={styles.addbtn}>
                    <AddButton
                      routeName={'AddMedicineStack'}
                      navigation={navigation}
                      styles={styles.btn}
                    />
                  </View>
                ),
              }}
            />
          );
        }
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: props => <TabBarButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
