import * as types from '../../actionTypes';

export const getUserProfileRequest = () => {
  return {
    type: types.USER_PROFILE_REQUEST,
  };
};
export const getUserProfileSuccess = payload => {
  return {
    type: types.USER_PROFILE_SUCCESS,
    payload,
  };
};
export const getUserProfileError = payload => {
  return {
    type: types.USER_PROFILE_ERROR,
    payload,
  };
};
export const getUserProfileClear = () => {
  return {
    type: types.USER_PROFILE_CLEAR,
  };
};
