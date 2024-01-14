import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPallete';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    alignItems: 'center',
  },
  card1: {
    width: '90%',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 3,
    marginVertical: 16,
  },
  mainView: {width: '100%', marginVertical: 10},
  subCont: {flexDirection: 'row', marginVertical: 12},
  subView1: {flex: 2.4},
  subView2: {flex: 3},
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 18,
  },
  content: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
  },
  divider: {marginVertical: 6, height: 1.2, width: '100%'},
  imgCont: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(8),
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 82,
    borderWidth: 3,
    borderColor: 'lightgrey',
  },
  userDetialsCont: {
    marginVertical: 4,
    alignItems: 'center',
    width: '60%',
  },
  userName: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
    color: 'grey',
    fontWeight: '400',
  },
  bottomCont: {
    marginVertical: 6,
  },
  viewMed: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 8,
    color: 'black',
  },
  viewPres: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
    color: 'black',
  },
});
