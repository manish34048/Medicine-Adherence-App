import * as types from '../../actionTypes';

export const refreshRequest = () => {
  return {
    type: types.REFRESH_REQUEST,
  };
};

export const refreshSuccess = payload => {
  return {
    type: types.REFRESH_SUCCESS,
    payload,
  };
};

export const refreshError = payload => {
  return {
    type: types.REFRESH_ERROR,
    payload,
  };
};
