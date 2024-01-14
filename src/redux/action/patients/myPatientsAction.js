import * as types from '../../actionTypes';

export const myPatientsRequest = payload => {
  return {
    type: types.MY_PATIENTS_REQUEST,
    payload,
  };
};
export const myPatientsSuccess = payload => {
  return {
    type: types.MY_PATIENTS_SUCCESS,
    payload,
  };
};
export const myPatientsError = payload => {
  return {
    type: types.MY_PATIENTS_ERROR,
    payload,
  };
};

export const myPatientsClear = () => {
  return {
    type: types.MY_PATIENTS_CLEAR,
  };
};
