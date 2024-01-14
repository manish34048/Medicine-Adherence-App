import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPallete.backgroundColor,
    flex: 1,
  },
  noPrescription: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistView: {
    alignItems: 'center',
    flex: 1,
  },
  flatList: {
    paddingTop: 4,
    backgroundColor: colorPallete.backgroundColor,
  },
  top: {flexDirection: 'row'},
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

  card: {
    width: 172,
    maxHeight: 300,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 0.4,
    borderColor: 'lightgrey',
    elevation: 3,
    shadowColor: 'black',
  },
  imgCont: {
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    overflow: 'hidden',
  },
  img: {
    width: '80%',
  },
  textContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  text1: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  font: {fontWeight: '600'},
  //doctor Prescription
  container1: {
    flex: 1,
    backgroundColor: colorPallete.mainColor,
  },
  lottieCont: {alignItems: 'center', justifyContent: 'center'},
  lottie: {width: '70%'},
  card1: {
    borderRadius: 12,
    marginBottom: 12,
    width: '94%',
    alignSelf: 'center',
  },
  mainView: {
    width: '100%',
    marginVertical: 10,
  },
  subCont: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  subView1: {flex: 2.4},
  subView2: {flex: 3, justifyContent: 'center'},
  heading: {
    color: 'black',
    fontSize: 17.6,
    fontWeight: '600',
    paddingLeft: 18,
  },
  content: {
    color: colorPallete.darkGrey,
    fontSize: 16.6,
    fontWeight: '400',
  },
  divider: {marginVertical: 6, height: 1.2, width: '100%'},
  touchable: {
    alignSelf: 'center',
    marginVertical: 12,
  },
  btn: {
    // color: colorPallete.GoldenYellow,
    color: 'black',
    fontSize: 18,
    padding: 8,
    fontWeight: '400',
  },
});
