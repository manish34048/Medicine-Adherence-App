import * as types from '../../actionTypes';

export const sendReqRequest = payload => {
  return {
    type: types.SEND_REQ_REQUEST,
    payload,
  };
};

export const sendReqSuccess = payload => {
  return {
    type: types.SEND_REQ_SUCCESS,
    payload,
  };
};

export const sendReqError = payload => {
  return {
    type: types.SEND_REQ_ERROR,
    payload,
  };
};

export const resetSend = () => {
  return {
    type: types.RESET_SEND_REQ,
  };
};
