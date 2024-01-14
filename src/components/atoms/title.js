import {Text} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/headerStyles';

const Title = ({title}) => {
  return <Text style={styles.headerFont}>{title}</Text>;
};

export default Title;
