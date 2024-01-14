import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  calendar: {
    height: '100%',
    paddingTop: verticalScale(10),
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colorPallete.backgroundColor,
  },
  calenderHeaderStyle: {
    color: colorPallete.mainColor,
    fontSize: horizontalScale(21),
  },
  calendarColor: colorPallete.basicColor,
  dateNumberStyle: {
    color: colorPallete.mainColor,
    fontSize: 14,
    fontWeight: '700',
  },
  dateNameStyle: {color: colorPallete.mainColor, fontSize: 11.5},
  daySelection: {
    type: 'background',
    highlightColor: colorPallete.mainColor,
  },
  icon: {flex: 0.13},
  iconStyle: {
    height: 19,
    width: 24,
  },
  highlightedDateNumber: {
    color: colorPallete.basicColor,
    fontSize: 14,
    fontWeight: '900',
  },
  highlightedDateName: {
    color: colorPallete.basicColor,
    fontSize: 11,
    fontWeight: '900',
  },
});
