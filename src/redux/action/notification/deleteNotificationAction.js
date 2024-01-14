import {deleteNotification} from '../../constant/notification/deleteNotificationConstant';

const loadDeleteNotification = notificationId => {
  return {
    type: deleteNotification.deleteNotificationLoad,
    payload: notificationId,
  };
};

const successDeleteNotification = data => {
  return {
    type: deleteNotification.deleteNotificationSuccess,
    payload: data,
  };
};

const errorDeleteNotification = error => {
  return {
    type: deleteNotification.deleteNotificationError,
    payload: error,
  };
};

export {
  loadDeleteNotification,
  successDeleteNotification,
  errorDeleteNotification,
};
