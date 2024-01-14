import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  headerItem: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPallete.mainColor,
    width: '100%',
  },
  header: {
    width: '69%',
  },
  headerFont: {
    fontSize: 24,
    color: colorPallete.basicColor,
  },
  appIcon: {
    alignItems: 'center',
    width: '17%',
    justifyContent: 'center',
    height: verticalScale(36),
    paddingLeft: 7,
  },
  bellIcon: {
    width: '14%',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: colorPallete.mainColor,
    height: '50%',
    width: '200%',
    borderBottomEndRadius: 530,
    borderBottomStartRadius: 590,
    top: -120,
    right: -120,
  },
});
