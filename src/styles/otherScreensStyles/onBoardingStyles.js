import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colorPallete.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: '100%', height: '100%'},
});
export default styles;
