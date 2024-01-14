/* eslint-disable indent */
import {
  PATIENT_REQ_CLEAR,
  PATIENT_REQ_ERROR,
  PATIENT_REQ_REQUEST,
  PATIENT_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const patientsRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_REQ_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case PATIENT_REQ_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case PATIENT_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case PATIENT_REQ_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
