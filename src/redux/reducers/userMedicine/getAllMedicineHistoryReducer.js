import {
  GET_ALL_MED_HISTORY_CLEAR,
  GET_ALL_MED_HISTORY_ERROR,
  GET_ALL_MED_HISTORY_REQUEST,
  GET_ALL_MED_HISTORY_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getAllMedicineHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MED_HISTORY_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case GET_ALL_MED_HISTORY_SUCCESS:
      return {
        ...state,
        data: action?.payload?.result,
        isLoading: false,
        error: null,
      };
    case GET_ALL_MED_HISTORY_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case GET_ALL_MED_HISTORY_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
