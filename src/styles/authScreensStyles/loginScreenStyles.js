import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  signInCont: {alignItems: 'center', width: '83%'},
  signInButton: {
    width: '100%',
    height: 54,
    borderRadius: 44,
    marginTop: 6,
  },
  signUpCont: {
    alignItems: 'center',
    marginTop: 15,
    width: '81%',
  },
  signUpView: {
    paddingVertical: 8,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  img: {height: 30, width: 30, marginHorizontal: 8},
  text: {
    fontSize: 16,
    fontFamily: 'bold',
    color: 'grey',
    marginLeft: 40,
  },
});
