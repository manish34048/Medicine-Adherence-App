import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: colorPallete.basicColor},
  setting: {color: 'gray', fontSize: 16, marginLeft: 15, marginTop: 8},
  settingItems: {color: 'black', fontSize: 18},
  general: {color: 'gray', fontSize: 16, marginLeft: 15},
});
export default styles;
