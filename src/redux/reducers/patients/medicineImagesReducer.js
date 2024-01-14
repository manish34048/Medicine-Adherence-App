/* eslint-disable indent */
import {
  USER_MED_IMAGES_CLEAR,
  USER_MED_IMAGES_ERROR,
  USER_MED_IMAGES_REQUEST,
  USER_MED_IMAGES_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const medicineImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_MED_IMAGES_REQUEST:
      return {...state, isLoading: true};
    case USER_MED_IMAGES_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case USER_MED_IMAGES_ERROR:
      return {...state, error: action.payload, isLoading: false};
    case USER_MED_IMAGES_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
