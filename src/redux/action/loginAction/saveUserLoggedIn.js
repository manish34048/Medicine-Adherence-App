import * as types from '../../actionTypes';

export const saveUserLoggedIn = payload => {
  return {
    type: types.SET_USER_LOGGEDIN,
    payload,
  };
};
