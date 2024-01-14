/* eslint-disable indent */
import {
  RESET_SIGNUP,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case SIGN_UP_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case RESET_SIGNUP:
      return {data: null, isLoading: false, error: ''};
    default:
      return state;
  }
};
