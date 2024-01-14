import {
  SYNC_HISTORY_DETAILS_CLEAR,
  SYNC_HISTORY_DETAILS_ERROR,
  SYNC_HISTORY_DETAILS_REQUEST,
  SYNC_HISTORY_DETAILS_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const syncHistoryDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_HISTORY_DETAILS_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case SYNC_HISTORY_DETAILS_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case SYNC_HISTORY_DETAILS_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case SYNC_HISTORY_DETAILS_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
