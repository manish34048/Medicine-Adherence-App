import {
  SEARCH_MEDICINE_ERROR,
  SEARCH_MEDICINE_SUCCESS,
  SEARCH_MEDICINE_REQUEST,
  SEARCH_MEDICINE_CLEAR,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const searchMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MEDICINE_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case SEARCH_MEDICINE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case SEARCH_MEDICINE_ERROR: {
      return {...state, error: action.payload, isLoading: false, data: null};
    }
    case SEARCH_MEDICINE_CLEAR: {
      return {data: null, isLoading: false, error: null};
    }
    default:
      return state;
  }
};
