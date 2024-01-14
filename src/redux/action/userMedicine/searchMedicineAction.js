import * as types from '../../actionTypes';

export const searchMedicineRequest = payload => {
  return {
    type: types.SEARCH_MEDICINE_REQUEST,
    payload,
  };
};
export const searchMedicineSuccess = payload => {
  return {
    type: types.SEARCH_MEDICINE_SUCCESS,
    payload,
  };
};
export const searchMedicineError = payload => {
  return {
    type: types.SEARCH_MEDICINE_ERROR,
    payload,
  };
};
export const searchMedicineClear = () => {
  return {
    type: types.SEARCH_MEDICINE_CLEAR,
  };
};
