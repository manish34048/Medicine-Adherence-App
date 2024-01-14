import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  //Add a caretaker screen
  container: {flex: 1, backgroundColor: 'white', height: '100%'},
  img: {width: 250},
  imgView: {position: 'absolute', alignSelf: 'center', top: 90},
  sdIcon: {name: 'add', color: 'white'},
  sdIconOpen: {name: 'close', color: 'white'},
  sdButton: {backgroundColor: colorPallete.mainColor},
  sdDeleteIcon: {name: 'delete', color: 'white'},
  sdHeight: {height: 50},
  button: {backgroundColor: 'white'},

  //rendering caretakerList
  cardContainer: {
    borderRadius: 20,
    margin: 6,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: '#3743ab',
  },
  top: {flexDirection: 'row', padding: 0},
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  listTitle: {fontSize: 16, marginLeft: 3, fontWeight: 'bold'},
  icon: {alignItems: 'center'},
  iconTouch: {paddingVertical: 15},

  //caretaker component
  tab: {backgroundColor: colorPallete.mainColor},
  tabIndicator: {
    backgroundColor: colorPallete.GoldenYellow,
    height: 3,
  },
  tabItemContainer: {backgroundColor: colorPallete.backgroundColor,borderEndWidth:5,borderColor:colorPallete.basicColor},
  tabItemTitle: {fontSize: 12, color: colorPallete.mainColor,},
  tabItem: {backgroundColor: colorPallete.basicColor, width: '100%'},
});
