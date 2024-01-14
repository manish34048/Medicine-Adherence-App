import { Animated, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles'
const AddMedicinesHeader = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={Styles.addMedicinesLogo}>
      <LottieView
        styles={{ width: '100%' }}
        speed={0.6}
        source={require('../../../assets/animation/addMedicinesHeader.json')}
        progress={progress}
      />
    </View>
  )
}
export default AddMedicinesHeader