import {
  USER_MEDICINE_LIST_CLEAR,
  USER_MEDICINE_LIST_ERROR,
  USER_MEDICINE_LIST_REQUEST,
  USER_MEDICINE_LIST_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const userMedicineListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_MEDICINE_LIST_REQUEST:
      return {...state, isLoading: true, data: null, error: null};
    case USER_MEDICINE_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isLoading: false,
        error: null,
      };
    case USER_MEDICINE_LIST_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case USER_MEDICINE_LIST_CLEAR:
      return {data: null, error: null, isLoading: false};
    default:
      return state;
  }
};
