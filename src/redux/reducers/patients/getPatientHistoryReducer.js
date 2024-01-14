/* eslint-disable indent */
import {
  GET_PATIENT_HISTORY_CLEAR,
  GET_PATIENT_HISTORY_ERROR,
  GET_PATIENT_HISTORY_REQUEST,
  GET_PATIENT_HISTORY_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const getPatientHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENT_HISTORY_REQUEST:
      return {...state, isLoading: true};
    case GET_PATIENT_HISTORY_SUCCESS:
      return {...state, data: action.payload.result, isLoading: false};
    case GET_PATIENT_HISTORY_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case GET_PATIENT_HISTORY_CLEAR:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
