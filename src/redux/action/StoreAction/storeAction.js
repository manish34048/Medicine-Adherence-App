import * as types from '../../actionTypes';

export const storeRequest = payload => {
  return {
    type: types.STORE_REQUEST,
    payload
  };
};

export const storeSuccess = payload => {
  return {
    type: types.STORE_SUCCESS,
    payload
  };
};

export const storeError = payload => {
  return {
    type: types.STORE_ERROR,
    payload
  };
};
