import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from '../../styles/otherScreensStyles/onBoardingStyles';
import {getMedicine} from '../../utils/storage';
import CustomImage from '../../components/atoms/customImage';
import Notifications from '../../pushNotification/pushNotifications';

const SplashScreen = () => {
  const [medData, setMedData] = useState([]);

  const getData = async () => {
    getMedicine().then(data => {
      if (data.length !== 0 && data !== null) {
        setMedData(data);
      } else {
        setMedData([]);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    notifyNotification();
  }, [medData]);

  const notifyNotification = () => {
    let date = new Date();
    let i;
    for (i = 0; i < medData.length; i++) {
      if (parseInt(medData[i].leftStock) >= parseInt(medData[i].stock)) {
        Notifications.notifyMedicineNotification(
          date,
          medData[i]?.stock,
          medData[i]?.medicineName,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomImage
        source={require('../../assets/images/medstick.png')}
        styles={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
