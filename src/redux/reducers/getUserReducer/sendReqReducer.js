/* eslint-disable indent */
import {
  RESET_SEND_REQ,
  SEND_REQ_ERROR,
  SEND_REQ_REQUEST,
  SEND_REQ_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const sendRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REQ_REQUEST:
      return {...state, isLoading: true};
    case SEND_REQ_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case SEND_REQ_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case RESET_SEND_REQ:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
