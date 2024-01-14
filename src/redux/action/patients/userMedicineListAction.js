import * as types from '../../actionTypes';

export const userMedicineListRequest = payload => {
  return {
    type: types.USER_MEDICINE_LIST_REQUEST,
    payload,
  };
};
export const userMedicineListSuccess = payload => {
  return {
    type: types.USER_MEDICINE_LIST_SUCCESS,
    payload,
  };
};
export const userMedicineListError = payload => {
  return {
    type: types.USER_MEDICINE_LIST_ERROR,
    payload,
  };
};

export const userMedicineListClear = () => {
  return {
    type: types.USER_MEDICINE_LIST_CLEAR,
  };
};
