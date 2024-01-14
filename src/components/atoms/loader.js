import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <LottieView
        source={require('../../assets/animation/loader.json')}
        autoPlay
        loop
        speed={0.8}
        style={{
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </View>
  );
};

export default Loader;
