/* eslint-disable indent */
import {
  MY_CARETAKER_CLEAR,
  MY_CARETAKER_ERROR,
  MY_CARETAKER_REQUEST,
  MY_CARETAKER_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const myCaretakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_CARETAKER_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case MY_CARETAKER_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case MY_CARETAKER_ERROR:
      return {...state, error: action, isLoading: false, data: null};
    case MY_CARETAKER_CLEAR:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
