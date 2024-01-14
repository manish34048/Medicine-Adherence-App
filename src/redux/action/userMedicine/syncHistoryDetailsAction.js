import * as types from '../../actionTypes';

export const syncHistoryDetailsRequest = payload => {
  return {
    type: types.SYNC_HISTORY_DETAILS_REQUEST,
    payload,
  };
};
export const syncHistoryDetailsSuccess = payload => {
  return {
    type: types.SYNC_HISTORY_DETAILS_SUCCESS,
    payload,
  };
};
export const syncHistoryDetailsError = payload => {
  return {
    type: types.SYNC_HISTORY_DETAILS_ERROR,
    payload,
  };
};
export const syncHistoryDetailsClear = () => {
  return {
    type: types.SYNC_HISTORY_DETAILS_CLEAR,
  };
};
