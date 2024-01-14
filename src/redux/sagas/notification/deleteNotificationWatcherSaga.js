import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  errorDeleteNotification,
  successDeleteNotification,
} from '../../action/notification/deleteNotificationAction';
import {deleteNotification} from '../../constant/notification/deleteNotificationConstant';

export function* deleteNotificationWorkerSaga(data) {
  const {payload} = data;
  try {
    const response = yield call(networkService.deleteNotification, payload);
    yield put(successDeleteNotification(response?.data));
  } catch (error) {
    yield put(errorDeleteNotification(error));
  }
}

export function* deleteNotificationWatcherSaga() {
  yield takeLatest(
    deleteNotification.deleteNotificationLoad,
    deleteNotificationWorkerSaga,
  );
}
