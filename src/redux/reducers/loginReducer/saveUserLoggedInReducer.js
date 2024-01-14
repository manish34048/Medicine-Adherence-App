/* eslint-disable indent */
import {SET_USER_LOGGEDIN} from '../../actionTypes';

const initialState = {
  data: false,
};
export const saveUserLoggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGGEDIN:
      return {data: action.payload};
    default:
      return state;
  }
};
