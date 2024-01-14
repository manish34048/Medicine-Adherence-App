import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(4),
    alignItems: 'center',
    paddingHorizontal: horizontalScale(13),
  },
  imgContainer: {
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
    marginVertical: verticalScale(5),
    borderRadius: 20,
    elevation: 4,
    height: 300,
    alignSelf: 'center',
  },
  flatList: {
    flex: 1,
    width: '100%',
    height: verticalScale(200),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorPallete.backgroundColor,
    marginHorizontal: 8,
    marginVertical: 6,
    elevation: 3,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  img: {width: '60%'},
  avatarView: {
    flexDirection: 'row',
    backgroundColor: colorPallete.backgroundColor,
    width: '72%',
  },
  medNameView: {flexDirection: 'column', width: '100%'},
  medName: {fontWeight: '600', fontSize: 20},
});
