/* eslint-disable indent */
import {
  CLEAR_REQUEST_STATUS,
  DELETE_PATIENT_REQ_ERROR,
  DELETE_PATIENT_REQ_REQUEST,
  DELETE_PATIENT_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const deletePatientReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PATIENT_REQ_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case DELETE_PATIENT_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case DELETE_PATIENT_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case CLEAR_REQUEST_STATUS:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
