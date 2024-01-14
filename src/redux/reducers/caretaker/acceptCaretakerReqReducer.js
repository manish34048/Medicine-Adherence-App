/* eslint-disable indent */
import {
  ACCEPT_CARETAKER_REQ_ERROR,
  ACCEPT_CARETAKER_REQ_REQUEST,
  ACCEPT_CARETAKER_REQ_SUCCESS,
  CLEAR_REQUEST_STATUS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const acceptCaretakerReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_CARETAKER_REQ_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case ACCEPT_CARETAKER_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case ACCEPT_CARETAKER_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false, error: null};
    case CLEAR_REQUEST_STATUS:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
