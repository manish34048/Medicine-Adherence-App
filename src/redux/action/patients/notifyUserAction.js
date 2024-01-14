import * as types from '../../actionTypes';

export const notifyUserRequest = payload => {
  return {
    type: types.NOTIFY_USER_REQUEST,
    payload,
  };
};
export const notifyUserSuccess = payload => {
  return {
    type: types.NOTIFY_USER_SUCCESS,
    payload,
  };
};
export const notifyUserError = payload => {
  return {
    type: types.NOTIFY_USER_ERROR,
    payload,
  };
};
export const notifyUserClear = () => {
  return {
    type: types.NOTIFY_USER_CLEAR,
  };
};
