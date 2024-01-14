import {
  GET_APPOINTMENT_CLEAR,
  GET_APPOINTMENT_ERROR,
  GET_APPOINTMENT_REQUEST,
  GET_APPOINTMENT_SUCCESS,
} from '../../actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getAppointmentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_REQUEST:
      return {...state, isLoading: true};
    case GET_APPOINTMENT_SUCCESS:
      console.log(action.payload,"payload")
      return {...state, data: action.payload, isLoading: false, error: null};
    case GET_APPOINTMENT_ERROR:
      return {...state, error: action.payload, isLoading: false, data: null};
    case GET_APPOINTMENT_CLEAR:
      return {data: null, isLoading: false, error: null};
    default:
      return state;
  }
};
