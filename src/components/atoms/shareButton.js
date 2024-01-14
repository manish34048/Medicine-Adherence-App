import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import {faShareFromSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ShareButton = ({options}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity onPress={options} activeOpacity={1}>
        <FontAwesomeIcon icon={faShareFromSquare} color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;
