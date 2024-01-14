/* eslint-disable indent */
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_LOGIN,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, isLoading: true, error: null, data: null};
    case LOGIN_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case LOGIN_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case RESET_LOGIN:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
