import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  form: {
    backgroundColor: colorPallete.backgroundColor,
    width: '100%',
    alignItems: 'center',
  },
  formView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    borderWidth: 0.6,
    borderRadius: 5,
    borderColor: colorPallete.mainColor,
  },
  field: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    width: '86%',
  },
  lottieCont: {
    height: '80%',
    alignItems: 'center',
    marginVertical: verticalScale(120),
  },
  lottie: {
    width: 300,
    height: 300,
    backgroundColor: colorPallete.backgroundColor,
  },
  text: {
    color: 'red',
    marginTop: 8,
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 33,
  },
  flatList: {width: '100%'},
  listButton: {
    backgroundColor: colorPallete.mainColor,
    padding: 10,
    borderRadius: 4,
  },
  text1: {color: colorPallete.backgroundColor},
  card: {
    borderRadius: 16,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(17),
    backgroundColor: colorPallete.basicColor,
  },
  mainView: {margin: 3},
  listView: {marginHorizontal: 8},
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {flexDirection: 'column', marginLeft: 10},
  font: {fontWeight: '600'},
});
