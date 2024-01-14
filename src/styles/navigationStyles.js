import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addbtn: {marginBottom: 5},
  btn: {height: 72, width: 72},
  ripple: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  focused: {fontSize: 11, marginTop: 4, color: 'black', fontWeight: '500'},
  notFocused: {fontSize: 11, marginTop: 4, color: 'grey', fontWeight: '300'},
});
