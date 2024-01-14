import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.mainColor},
  lottieView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: '42%',
  },
  mainView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1,
    marginTop: 16,
  },
  scrollView: {width: '80%'},
  scrollCont: {
    alignItems: 'center',
  },
  textContainer: {marginTop: 20, marginBottom: 30},
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  dropdownCont: {marginBottom: 20, width: '90%'},
  imgCont: {marginTop: 10},
  imgText: {color: 'black', fontSize: 18},
  dividerCont: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    color: 'grey',
    width: '6%',
  },
  dividerText: {
    paddingHorizontal: 6,
    marginVertical: 6,
    color: 'black',
  },
  btnStyle: {
    backgroundColor: colorPallete.mainColor,
    borderRadius: 6,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnContainer: {marginTop: 40, marginBottom: 80},
  //dropdown
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: 'black',
  },
});
