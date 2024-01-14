import * as types from '../../actionTypes';

export const signUpRequest = payload => {
  return {
    type: types.SIGN_UP_REQUEST,
    payload,
  };
};

export const signUpSuccess = payload => {
  return {
    type: types.SIGN_UP_SUCCESS,
    payload,
  };
};

export const signUpError = payload => {
  return {
    type: types.SIGN_UP_ERROR,
    payload,
  };
};

export const resetSignUp = () => {
  return {
    type: types.RESET_SIGNUP,
  };
};
