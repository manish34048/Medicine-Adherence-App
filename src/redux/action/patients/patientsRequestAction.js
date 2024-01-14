import * as types from '../../actionTypes';

export const patientsReqRequest = payload => {
  return {
    type: types.PATIENT_REQ_REQUEST,
    payload,
  };
};
export const patientsReqSuccess = payload => {
  return {
    type: types.PATIENT_REQ_SUCCESS,
    payload,
  };
};
export const patientsReqError = payload => {
  return {
    type: types.PATIENT_REQ_ERROR,
    payload,
  };
};

export const patientsReqClear = () => {
  return {
    type: types.PATIENT_REQ_CLEAR,
  };
};
