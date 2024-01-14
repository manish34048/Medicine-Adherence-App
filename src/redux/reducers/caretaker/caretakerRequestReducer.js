/* eslint-disable indent */
import {
  CARETAKER_REQ_CLEAR,
  CARETAKER_REQ_ERROR,
  CARETAKER_REQ_REQUEST,
  CARETAKER_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const caretakerRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARETAKER_REQ_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case CARETAKER_REQ_SUCCESS:
      console.log(action.payload.result,"resulttttt");
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case CARETAKER_REQ_ERROR:
      return {...state, error: action, isLoading: false, data: null};
    case CARETAKER_REQ_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
