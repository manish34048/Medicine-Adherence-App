/* eslint-disable indent */
import {
  REFRESH_ERROR,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const refreshReducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_REQUEST:
      return {...state, isLoading: true};
    case REFRESH_SUCCESS:
      console.log(action);
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case REFRESH_ERROR:
      return {...state, error: action.payload, data: null, isLoading: false};
    default:
      return state;
  }
};
