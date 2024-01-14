import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const notificationStyles = StyleSheet.create({
  card: {
    width: '98%',
    borderColor: colorPallete.appColor,
    backgroundColor: colorPallete.basicColor,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  screen: {
    backgroundColor: colorPallete.backgroundColor,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    color: colorPallete.darkGrey,
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    paddingTop: 5,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '500',
    color: colorPallete.appColor,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: colorPallete.blackColor,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
