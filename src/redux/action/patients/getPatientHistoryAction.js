import * as types from '../../actionTypes';

export const getPatientHistoryRequest = payload => {
  return {
    type: types.GET_PATIENT_HISTORY_REQUEST,
    payload,
  };
};
export const getPatientHistorySuccess = payload => {
  return {
    type: types.GET_PATIENT_HISTORY_SUCCESS,
    payload,
  };
};
export const getPatientHistoryError = payload => {
  return {
    type: types.GET_PATIENT_HISTORY_ERROR,
    payload,
  };
};
export const getPatientHistoryClear = () => {
  return {
    type: types.GET_PATIENT_HISTORY_CLEAR,
  };
};
