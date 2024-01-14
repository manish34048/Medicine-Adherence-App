import {View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPallete} from './colorPalette';
const BellIcon = () => {
  return (
    <View>
      <MaterialCommunityIcons
        name="bell-circle"
        color={colorPallete.appColor}
        size={35}
      />
    </View>
  );
};

export default BellIcon;
