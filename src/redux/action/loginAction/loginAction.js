import * as types from '../../actionTypes';

export const loginRequest = payload => {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
};

export const loginSuccess = payload => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

export const loginError = payload => {
  return {
    type: types.LOGIN_ERROR,
    payload,
  };
};

export const resetLogin = () => {
  return {
    type: types.RESET_LOGIN,
  };
};
