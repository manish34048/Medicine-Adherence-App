import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../atoms/appIcon';
import BellIcon from '../bellIcon';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import {CustomAlert} from '../../atoms/customAlert';

const MainHeader = ({title, navigation, download}) => {
  const load = useSelector(state => state.userInfo?.data);
  const connected = useSelector(state => state.internetConnectivity?.data);

  const showAlert = () => {
    CustomAlert({text1: 'No Internet Connection'});
  };

  return (
    <View style={styles.headerItem}>
      <AppIcon />
      <View style={styles.header}>
        <Title title={title} />
      </View>
      {title !== 'Medstick' ? null : <BellIcon navigation={navigation} />}
      {title !== 'Report' ? null : load ? (
        <View style={styles.bellIcon}>
          <TouchableOpacity
            onPress={() => {
              connected ? download() : showAlert();
            }}
            activeOpacity={0.8}
            style={{padding: 10}}>
            <FontAwesomeIcon icon={faDownload} color={'white'} size={18} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default MainHeader;
