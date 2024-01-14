import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  //list of Caretaker
  top: {
    flexDirection: 'row',
    marginVertical: verticalScale(2),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    color: 'black',
    fontSize: 16,
    marginLeft: horizontalScale(3),
    fontWeight: 'bold',
  },
  subtitle: {marginLeft: horizontalScale(3)},

  //main
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  img: {width: '70%'},
  imgView: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: horizontalScale(16),
  },
  addBtn: {height: 84, width: 84},
});
