import * as types from '../../actionTypes';

export const acceptPatientReqRequest = payload => {
  console.log(payload,"payload")
  return {
    type: types.ACCEPT_PATIENT_REQ_REQUEST,
    payload,
  };
};
export const acceptPatientReqSuccess = payload => {
  return {
    type: types.ACCEPT_PATIENT_REQ_SUCCESS,
    payload,
  };
};
export const acceptPatientReqError = payload => {
  return {
    type: types.ACCEPT_PATIENT_REQ_ERROR,
    payload,
  };
};
export const clearRequestStatus = () => {
  return {
    type: types.CLEAR_REQUEST_STATUS,
  };
};
