/* eslint-disable indent */
import {
  USER_PROFILE_CLEAR,
  USER_PROFILE_ERROR,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const getUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case USER_PROFILE_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case USER_PROFILE_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
