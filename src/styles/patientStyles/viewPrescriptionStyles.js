import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const style = StyleSheet.create({
  mainCont: {flex: 1, backgroundColor: colorPallete.basicColor},
  imgCont: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingTop: 4,
    backgroundColor: colorPallete.backgroundColor,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  patientName: {
    fontSize: 16,
    // marginLeft: 3,
    fontWeight: 'normal',
  },
  touch: {paddingVertical: 15},
  icon: {alignItems: 'center'},
  subtitle: {
    color: 'black',
  },

  font: {fontWeight: '600'},
  btn: {marginRight: 12},
});
