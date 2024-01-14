import * as types from '../../actionTypes';

export const saveInternetConnectivityStatus = payload => {
  return {
    type: types.INTERNET_CONNECTIVITY,
    payload,
  };
};
