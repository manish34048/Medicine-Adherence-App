import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const DownloadButton = ({download}) => {
  return (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={download}
        activeOpacity={1}
        style={{padding: 2}}>
        <FontAwesomeIcon icon={faDownload} color={'white'} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadButton;
