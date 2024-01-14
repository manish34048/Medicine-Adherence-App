import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';

const styles = StyleSheet.create({
  //saved Details
  card: {
    borderRadius: 10,
    marginBottom: 12,
    width: '92%',
    alignSelf: 'center',
    elevation: 3,
  },
  mainView: {
    margin: 6,
    minHeight: 80,
    width: '96.5%',
  },
  subView1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 2,
  },
  heading: {
    fontSize: 19,
    // marginLeft: 4,
    fontWeight: '500',
    color: 'black',
  },
  subCont: {marginBottom: 8},
  subView2: {
    marginHorizontal: 9,
    marginTop: 4,
    fontSize: 17,
  },
  content: {color: 'grey', fontSize: 15},

  //editProfile
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  childCont: {
    height: 180,
    backgroundColor: colorPallete.mainColor,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // justifyContent: 'space-evenly',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
    marginLeft: 14,
  },
  infoCont: {
    marginBottom: 20,
    marginLeft: 16,
    width: '60%',
    // backgroundColor: 'yellow',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    // backgroundColor: 'red',
    width: '100%',
  },
  email: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 6,
  },
  editBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 14,
    bottom: 10,
    padding: 2,
  },
  editText: {color: 'white', marginRight: 6, fontSize: 16},

  //inputField
  field: {height: 48, backgroundColor: 'white'},
  bio: {height: 120, backgroundColor: 'white'},
  inputForm: {
    marginHorizontal: 20,
  },
  inputField: {
    marginBottom: 10,
  },
  editButtonContainer: {alignItems: 'center', marginVertical: 40},
  editButton: {
    backgroundColor: colorPallete.mainColor,
    width: '50%',
    borderRadius: 5,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    // marginLeft: 14,
    marginTop: 1,
  },
  errorText1: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    // marginLeft: 14,
    marginTop: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  subInputGroup: {width: '48%'},
  picker: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
    // height: 48,
  },
  fieldHeading: {fontSize: 17, color: 'grey', fontWeight: '500'},
  pickerHeading: {
    fontSize: 17,
    color: 'grey',
    marginBottom: 4,
    fontWeight: '500',
  },
  pickerText: {
    color: 'black',
  },
  dobTouch: {
    height: 48,
    borderWidth: 1.1,
    borderRadius: 3.5,
    borderColor: 'lightgrey',
    justifyContent: 'center',
  },
  dobView: {
    backgroundColor: 'blue',
  },
  dobText: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 13,
  },
});

export default styles;
