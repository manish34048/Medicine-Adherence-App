import * as types from '../../actionTypes';

export const caretakerReqRequest = payload => {
  return {
    type: types.CARETAKER_REQ_REQUEST,
    payload,
  };
};
export const caretakerReqSuccess = payload => {
  return {
    type: types.CARETAKER_REQ_SUCCESS,
    payload,
  };
};
export const caretakerReqError = payload => {
  console.log(payload,"payload3");
  return {
    type: types.CARETAKER_REQ_ERROR,
    payload,
  };
};
export const caretakerReqClear = () => {
  return {
    type: types.CARETAKER_REQ_CLEAR,
  };
};
