import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  tabIndicator: {
    backgroundColor: colorPallete.GoldenYellow,
    height: 3,
  },
  tab: {backgroundColor: colorPallete.mainColor},
  tabItem: {backgroundColor: colorPallete.backgroundColor,borderEndWidth:5,borderColor:colorPallete.basicColor,},
  tabTitle: {fontSize: 12, color: colorPallete.mainColor},
  tabItems: {backgroundColor: colorPallete.basicColor, width: '100%'},
});
