/* eslint-disable indent */
import {
  DOWNLOAD_PDF_ERROR,
  DOWNLOAD_PDF_REQUEST,
  DOWNLOAD_PDF_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const downloadPdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_PDF_REQUEST:
      return {...state, isLoading: true};
    case DOWNLOAD_PDF_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case DOWNLOAD_PDF_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    default:
      return state;
  }
};
