/* eslint-disable indent */
import {
  MY_PRESCRIPTIONS_CLEAR,
  MY_PRESCRIPTIONS_ERROR,
  MY_PRESCRIPTIONS_REQUEST,
  MY_PRESCRIPTIONS_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const myPrescriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PRESCRIPTIONS_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case MY_PRESCRIPTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case MY_PRESCRIPTIONS_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case MY_PRESCRIPTIONS_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
