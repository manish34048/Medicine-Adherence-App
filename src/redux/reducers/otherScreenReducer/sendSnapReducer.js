/* eslint-disable indent */
import {
  SEND_SNAP_CLEAR,
  SEND_SNAP_ERROR,
  SEND_SNAP_REQUEST,
  SEND_SNAP_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const sendSnapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_SNAP_REQUEST:
      return {...state, isLoading: true};
    case SEND_SNAP_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case SEND_SNAP_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case SEND_SNAP_CLEAR:
      return {data: null, error: null, isLoading: true};
    default:
      return state;
  }
};
