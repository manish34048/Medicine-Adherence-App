import * as types from '../../actionTypes';

export const downloadPdfRequest = payload => {
  return {
    type: types.DOWNLOAD_PDF_REQUEST,
    payload,
  };
};
export const downloadPdfSuccess = payload => {
  return {
    type: types.DOWNLOAD_PDF_SUCCESS,
    payload,
  };
};
export const downloadPdfError = payload => {
  return {
    type: types.DOWNLOAD_PDF_ERROR,
    payload,
  };
};
