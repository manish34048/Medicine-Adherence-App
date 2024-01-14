import * as types from '../../actionTypes';

export const deleteCaretakerReqRequest = payload => {
  return {
    type: types.DELETE_CARETAKER_REQ_REQUEST,
    payload,
  };
};
export const deleteCaretakerReqSuccess = payload => {
  return {
    type: types.DELETE_CARETAKER_REQ_SUCCESS,
    payload,
  };
};
export const deleteCaretakerReqError = payload => {
  return {
    type: types.DELETE_CARETAKER_REQ_ERROR,
    payload,
  };
};
export const clearRequestStatus = () => {
  return {
    type: types.CLEAR_REQUEST_STATUS,
  };
};
