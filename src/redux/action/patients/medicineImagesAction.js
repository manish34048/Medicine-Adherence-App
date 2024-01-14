import * as types from '../../actionTypes';

export const medicineImagesRequest = payload => {
  return {
    type: types.USER_MED_IMAGES_REQUEST,
    payload,
  };
};
export const medicineImagesSuccess = payload => {
  return {
    type: types.USER_MED_IMAGES_SUCCESS,
    payload,
  };
};
export const medicineImagesError = payload => {
  return {
    type: types.USER_MED_IMAGES_ERROR,
    payload,
  };
};
export const medicineImagesClear = () => {
  return {
    type: types.USER_MED_IMAGES_CLEAR,
  };
};
