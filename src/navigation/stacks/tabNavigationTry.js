import React from 'react'
import HomeScreen from '../../screens/userScreens/homeScreen'
import Report from '../../screens/userScreens/report/report'
import AddMedicineLocal from '../../screens/userScreens/medicines/addMedicineLocal'
import MedicinePanel from '../../screens/userScreens/medicines/medicinePanel'
import AccountTab from '../../screens/userScreens/accountTab'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab=createBottomTabNavigator();

const TabNavigation = () => {
  return (
        <Tab.Navigator
        
        screenOptions={({route})=>({
            
            tabBarIcon:({focused,color,size})=>{
            
            }
        })}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Report' component={Report} />
            <Tab.Screen name='Add' component={AddMedicineLocal}/>
            <Tab.Screen name='Medicine' component={MedicinePanel}/>
            <Tab.Screen name='Account' component={AccountTab}/>
        </Tab.Navigator>
  )
}

export default TabNavigation