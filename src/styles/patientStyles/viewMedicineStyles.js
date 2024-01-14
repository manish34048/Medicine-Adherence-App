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
    flex: 1,
    backgroundColor: colorPallete.backgroundColor,
    paddingTop: 2,
  },
  card: {
    flexDirection: 'row',
    margin: 2,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  title: {
    fontWeight: '700',
    color: colorPallete.black,
    fontSize: 17,
  },
  subtitle1: {
    marginVertical: 3,
    fontSize: 15,
    fontWeight: '400',
    color: colorPallete.colorTabsOutline,
  },
  subtitle2: {
    fontSize: 13,
    fontWeight: '400',
    color: colorPallete.colorTabsOutline,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesbtn: {
    marginRight: 18,
    borderRadius: 4,
    backgroundColor: colorPallete.mainColor,
  },
  imagesText: {padding: 8, fontSize: 16, color: colorPallete.basicColor},
  ripple: {
    marginRight: 10,
    padding: 6,
    borderRadius: 16,
  },
});
