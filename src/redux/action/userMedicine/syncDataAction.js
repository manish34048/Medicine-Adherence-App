import * as types from '../../actionTypes';

export const syncDataRequest = payload => {
  console.log(payload,"payload")
  return {
    type: types.SYNC_DATA_REQUEST,
    payload,
  };
};
export const syncDataSuccess = payload => {
  return {
    type: types.SYNC_DATA_SUCCESS,
    payload,
  };
};
export const syncDataError = payload => {
  return {
    type: types.SYNC_DATA_ERROR,
    payload,
  };
};
export const syncDataClear = () => {
  return {
    type: types.SYNC_DATA_CLEAR,
  };
};
