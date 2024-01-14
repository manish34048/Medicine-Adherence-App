/* eslint-disable indent */
import {
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  RESET_PROFILE,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case EDIT_PROFILE_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case EDIT_PROFILE_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case RESET_PROFILE:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
