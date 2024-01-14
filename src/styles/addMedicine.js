import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', height: '100%'},
  bottom: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
  },
  addButtonTouch: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLottie: {
    bottom: 3,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  imgView: {alignItems: 'center', justifyContent: 'center'},
  img: {width: 300},
});
