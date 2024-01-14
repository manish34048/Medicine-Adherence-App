import React, {useEffect, useRef} from 'react';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';

const ModalHeader = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <LottieView
      style={Styles.modallottie}
      speed={0.2}
      source={require('../../../assets/animation/modal.json')}
      autoPlay
      loop
    />
  );
};

export default ModalHeader;
