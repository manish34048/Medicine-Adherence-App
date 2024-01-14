/* eslint-disable indent */
import {EXPIRY_ERROR, EXPIRY_REQUEST, EXPIRY_SUCCESS} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const expiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPIRY_REQUEST:
      return {...state, isLoading: true};
    case EXPIRY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case EXPIRY_ERROR:
      return {...state, error: action.payload, data: null, isLoading: false};
    default:
      return state;
  }
};
