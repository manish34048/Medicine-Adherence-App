import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  AppState,
  SafeAreaView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {colorPallete} from './colorPalette';
import {verticalScale} from './constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {saveInternetConnectivityStatus} from '../../redux/action/loginAction/saveInternetConnectivity';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colorPallete.redPercentageColor,
    paddingBottom: Platform.OS === 'ios' ? (DeviceInfo.hasNotch() ? 37 : 0) : 0,
  },
  offlineText: {
    color: colorPallete.basicColor,
    padding: verticalScale(10),
    textAlign: 'center',
  },
});

const OfflineBar = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isConnected, setIsConnected] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const dispatch = useDispatch();

  useEffect(() => {
    checkNetworkHandler();
  }, []);

  const checkNetworkHandler = () => {
    let intenetInfo;
    if (!intenetInfo) {
      intenetInfo = NetInfo.addEventListener(state => {
        dispatch(saveInternetConnectivityStatus(state.isConnected));
        setIsConnected(state.isConnected);
      });
    }
    return () => {
      intenetInfo && intenetInfo();
    };
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkNetworkHandler();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  const animationConstants = {
    DURATION: 800,
    TO_VALUE: 4,
    INPUT_RANGE: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0],
  };
  const triggerAnimation = () => {
    Animated.timing(fadeAnim, {
      duration: animationConstants.DURATION,
      toValue: animationConstants.TO_VALUE,
      useNativeDriver: true,
      ease: Easing.bounce,
    }).start();
  };
  useEffect(() => {
    triggerAnimation();
  }, []);
  const interpolated = fadeAnim.interpolate({
    inputRange: animationConstants.INPUT_RANGE,
    outputRange: animationConstants.OUTPUT_RANGE,
  });
  const animationStyle = {
    transform: [{translateX: interpolated}],
  };
  return !isConnected ? (
    <SafeAreaView style={[Styles.container]}>
      <View>
        <StatusBar backgroundColor={colorPallete.redPercentageColor} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons name={'wifi-off'} color={'white'} size={16} />
          <Animated.Text style={[Styles.offlineText, animationStyle]}>
            No Internet connection
          </Animated.Text>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
};
export default OfflineBar;
