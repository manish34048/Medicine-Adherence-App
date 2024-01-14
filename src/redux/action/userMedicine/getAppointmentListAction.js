import * as types from '../../actionTypes';

export const getAppointmentListRequest = () => {
  return {
    type: types.GET_APPOINTMENT_REQUEST,
  };
};
export const getAppointmentListSuccess = payload => {
  console.log(payload,"success payload")
  return {
    type: types.GET_APPOINTMENT_SUCCESS,
    payload,
  };
};
export const getAppointmentListError = payload => {
  return {
    type: types.GET_APPOINTMENT_ERROR,
    payload,
  };
};
export const getAppointmentListClear = () => {
  return {
    type: types.GET_APPOINTMENT_CLEAR,
  };
};
