import {getAllNotification} from '../../constant/notification/getAllNotificationConstant';

const loadGetAllNotification = pageNo => {
  return {
    type: getAllNotification.getAllNotificationLoad,
    payload: pageNo,
  };
};
const successGetAllNotification = data => {
  return {
    type: getAllNotification.getAllNotificationSuccess,
    payload: data,
  };
};

const errorGetAllNotification = err => {
  return {
    type: getAllNotification.getAllNotificationError,
    payload: err,
  };
};
const clearAllNotification = () => {
  return {
    type: getAllNotification.clearAllNotification,
  };
};

export {
  loadGetAllNotification,
  successGetAllNotification,
  errorGetAllNotification,
  clearAllNotification,
};
