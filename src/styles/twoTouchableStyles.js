import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../components/atoms/constant';
export const Styles = StyleSheet.create({
  box: {
    height: 35,
    shadowColor: 'black',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '10%',
    justifyContent: 'center',
  },
  name: {
    width: '90%',
    justifyContent: 'center',
  },
});
