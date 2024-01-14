import * as types from '../../actionTypes';

export const myCaretakerRequest = payload => {
  return {
    type: types.MY_CARETAKER_REQUEST,
    payload,
  };
};
export const myCaretakerSuccess = payload => {
  return {
    type: types.MY_CARETAKER_SUCCESS,
    payload,
  };
};
export const myCaretakerError = payload => {
  return {
    type: types.MY_CARETAKER_ERROR,
    payload,
  };
};
export const myCaretakerClear = payload => {
  return {
    type: types.MY_CARETAKER_CLEAR,
    payload,
  };
};
