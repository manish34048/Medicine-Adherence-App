import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  notifyUserError,
  notifyUserSuccess,
} from '../../action/patients/notifyUserAction';
import networkService from '../../../network/networkService';

export function* notifyUserSaga(data) {
  try {
    let response = yield call(networkService.postNotification, data);
    yield put(notifyUserSuccess(response?.data));
  } catch (error) {
    yield put(notifyUserError(error));
  }
}

export function* watchNotifyUserSaga() {
  yield takeLatest(types.NOTIFY_USER_REQUEST, notifyUserSaga);
}
