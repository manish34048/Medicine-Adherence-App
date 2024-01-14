import {deleteNotification} from '../../constant/notification/deleteNotificationConstant';

const initialState = {
  data: null,
  loading: {
    loader: false,
  },
  error: {
    error: null,
  },
};

const deleteNotificationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case deleteNotification.deleteNotificationLoad: {
      return {
        ...state,
        loading: {...state.loading, loader: true},
        error: {...state.error, error: null},
      };
    }

    case deleteNotification.deleteNotificationSuccess: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: null},
        data: action.payload,
      };
    }

    case deleteNotification.deleteNotificationError: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: action.payload},
      };
    }

    default: {
      return state;
    }
  }
};

export default deleteNotificationReducer;
