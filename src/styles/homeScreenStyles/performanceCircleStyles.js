import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPallete';
import {verticalScale} from '../../components/atoms/constant';

export const Styles = StyleSheet.create({
  performanceContainer: {
    borderWidth: 0,
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    backgroundColor: colorPallete.basicColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  outerCircle: {marginTop: verticalScale(4)},
  percentage: {fontSize: 18, color: colorPallete.redPercentageColor},
  performance: {
    // color: colorPallete.mainColor,
    color: '#EB5E0B',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
    fontSize: 24,
    // paddingTop: 10,
  },
  color: colorPallete.redPercentageColor,
  shadowColor: colorPallete.restPercentageColor,
  bgColor: colorPallete.basicColor,

  //card
  card: {
    borderRadius: 30,
    margin: 3,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: '#3743ab',
  },
  listView: {marginBottom: 7},
  list: {backgroundColor: 'white', height: 80, width: '100%'},
  avatarView: {flexDirection: 'row'},
  medNameView: {flexDirection: 'column', margin: 3},
  medName: {fontWeight: '600'},
  rem: {marginRight: 10},
  container: {flex: 1, backgroundColor: 'white', height: '100%'},
  imgView: {alignItems: 'center', justifyContent: 'center'},
  img: {width: 300},
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
});
