/* eslint-disable indent */
import {INTERNET_CONNECTIVITY} from '../../actionTypes';

const initialState = {
  data: false,
};
export const saveInternetConnectivityReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case INTERNET_CONNECTIVITY:
      return {data: action.payload};
    default:
      return state;
  }
};
