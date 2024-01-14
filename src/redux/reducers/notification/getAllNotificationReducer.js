import {getAllNotification} from '../../constant/notification/getAllNotificationConstant';

const initialState = {
  data: null,
  loading: {
    loader: false,
  },
  error: {
    error: null,
  },
};

const getAllNotificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case getAllNotification.getAllNotificationLoad: {
      return {
        ...state,
        loading: {...state.loading, loader: true},
        error: {...state.error, error: null},
      };
    }
    case getAllNotification.getAllNotificationSuccess: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: null},
        data: action.payload,
      };
    }
    case getAllNotification.getAllNotificationError: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: action.payload},
        data: null,
      };
    }
    case getAllNotification.clearAllNotification:
      return {
        data: null,
        loading: {
          loader: false,
        },
        error: {
          error: null,
        },
      };
    default: {
      return state;
    }
  }
};

export default getAllNotificationReducer;
