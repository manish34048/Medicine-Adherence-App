import * as types from '../../actionTypes';

export const getUserRequest = payload => {
  return {
    type: types.GET_USER_REQUEST,
    payload,
  };
};

export const getUserSuccess = payload => {
  return {
    type: types.GET_USER_SUCCESS,
    payload,
  };
};

export const getUserError = payload => {
  return {
    type: types.GET_USER_ERROR,
    payload,
  };
};

export const resetUser = () => {
  return {
    type: types.RESET_USER,
  };
};
