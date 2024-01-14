/* eslint-disable indent */
import {
  NOTIFY_USER_CLEAR,
  NOTIFY_USER_ERROR,
  NOTIFY_USER_REQUEST,
  NOTIFY_USER_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const notifyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_USER_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case NOTIFY_USER_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case NOTIFY_USER_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case NOTIFY_USER_CLEAR:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
