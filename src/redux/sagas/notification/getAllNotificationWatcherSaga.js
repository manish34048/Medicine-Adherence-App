import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  errorGetAllNotification,
  successGetAllNotification,
} from '../../action/notification/getAllNotification';
import {getAllNotification} from '../../constant/notification/getAllNotificationConstant';

export function* getAllNotificationWorkerSaga(data) {
  const {payload} = data;
  try {
    const response = yield call(networkService.getAllNotification, payload);
    yield put(successGetAllNotification(response?.data));
  } catch (error) {
    yield put(errorGetAllNotification(error));
  }
}

export function* getAllNotificationWatcherSaga() {
  yield takeLatest(
    getAllNotification.getAllNotificationLoad,
    getAllNotificationWorkerSaga,
  );
}
