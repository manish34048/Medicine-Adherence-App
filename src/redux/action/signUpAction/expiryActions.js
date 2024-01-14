import * as types from '../../actionTypes';

export const expiryRequest = () => {
  return {
    type: types.EXPIRY_REQUEST,
  };
};

export const expirySuccess = payload => {
  return {
    type: types.EXPIRY_SUCCESS,
    payload,
  };
};

export const expiryError = payload => {
  return {
    type: types.EXPIRY_ERROR,
    payload,
  };
};
