import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {StyleSheet} from 'react-native';

const ErrorBoundary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <LottieView
          style={styles.lottie}
          speed={0.8}
          source={require('../../assets/animation/wentWrong.json')}
          autoPlay
          loop
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Something Went Wrong</Text>
          <Text style={styles.content}>Try Again Later</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottie: {width: '34%'},
  textContainer: {marginVertical: 28, alignItems: 'center'},
  heading: {fontWeight: '600', fontSize: 20, color: 'black'},
  content: {
    marginTop: 12,
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
});

export default ErrorBoundary;
