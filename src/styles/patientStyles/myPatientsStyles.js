import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  //main
  container: {backgroundColor: colorPallete.backgroundColor, flex: 1},
  imgCont: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '70%'},
  button: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: horizontalScale(16),
  },
  addBtn: {height: 84, width: 84},

  //list of Patients
  top: {flexDirection: 'row', marginVertical: 2},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    color: 'black',
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 'bold',
  },
  subtitle: {marginLeft: 3},
});
