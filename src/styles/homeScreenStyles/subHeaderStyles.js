import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  subHeader: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPallete.mainColor,
  },
  header: {
    width: '60%',
  },
  subHeaderFont: {
    fontSize: 20,
    color: colorPallete.basicColor,
  },
  backIcon: {
    alignItems: 'center',
    width: '14%',
    padding: 10,
    backgroundColor:colorPallete.mainColor
  },
  bellIcon: {
    width: '23%',
    alignItems: 'flex-end',
  },
});
