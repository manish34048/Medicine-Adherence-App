import * as types from '../../actionTypes';

export const acceptCaretakerReqRequest = payload => {
  return {
    type: types.ACCEPT_CARETAKER_REQ_REQUEST,
    payload,
  };
};
export const acceptCaretakerReqSuccess = payload => {
  return {
    type: types.ACCEPT_CARETAKER_REQ_SUCCESS,
    payload,
  };
};
export const acceptCaretakerReqError = payload => {
  return {
    type: types.ACCEPT_CARETAKER_REQ_ERROR,
    payload,
  };
};
export const clearRequestStatus = () => {
  return {
    type: types.CLEAR_REQUEST_STATUS,
  };
};
