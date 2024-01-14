import * as types from '../../actionTypes';

export const deletePatientReqRequest = payload => {

  return {
    type: types.DELETE_PATIENT_REQ_REQUEST,
    payload,
  };
};
export const deletePatientReqSuccess = payload => {
  return {
    type: types.DELETE_PATIENT_REQ_SUCCESS,
    payload,
  };
};
export const deletePatientReqError = payload => {
  return {
    type: types.DELETE_PATIENT_REQ_ERROR,
    payload,
  };
};
export const clearRequestStatus = () => {
  return {
    type: types.CLEAR_REQUEST_STATUS,
  };
};
