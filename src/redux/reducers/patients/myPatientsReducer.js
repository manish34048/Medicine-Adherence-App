/* eslint-disable indent */
import {
  MY_PATIENTS_CLEAR,
  MY_PATIENTS_ERROR,
  MY_PATIENTS_REQUEST,
  MY_PATIENTS_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const myPatientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PATIENTS_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case MY_PATIENTS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case MY_PATIENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        data: null,
      };
    case MY_PATIENTS_CLEAR:
      return {
        data: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
