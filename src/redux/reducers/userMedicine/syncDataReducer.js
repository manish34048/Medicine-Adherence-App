import {
  SYNC_DATA_CLEAR,
  SYNC_DATA_ERROR,
  SYNC_DATA_REQUEST,
  SYNC_DATA_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const syncDataReducer = (state = initialState, action) => {
  console.log(action.type,"actionTypesssss")
  switch (action.type) {
    case SYNC_DATA_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case SYNC_DATA_SUCCESS:
      return {...state, data: action.payload, isLoading: false, error: null};
    case SYNC_DATA_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case SYNC_DATA_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
