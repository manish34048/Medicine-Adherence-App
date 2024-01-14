import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  imgView: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '90%'},
  card: {
    elevation: 3,
    marginTop: 8,
    borderRadius: 25,
    marginHorizontal: 14,
    marginBottom: 4,
  },
  cardInner: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  avatar: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  container1: {
    flexDirection: 'column',
    width: '80%',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  listTitle: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  listSubTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    marginLeft: 15,
  },
  buttonView: {flexDirection: 'row', marginLeft: 25, bottom: 10},
  confirmButton: {
    width: 80,
    borderRadius: 25,
    // marginBottom: 10,
    backgroundColor: colorPallete.mainColor,
  },
  space: {margin: 5},
  deleteButton: {
    width: 80,
    borderRadius: 25,
    backgroundColor: colorPallete.redPercentageColor,
  },
});
