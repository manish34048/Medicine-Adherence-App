import {call, put, takeLatest} from 'redux-saga/effects';
import {
  sendSnapError,
  sendSnapSuccess,
} from '../../action/otherScreenAction/sendSnapAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* sendSnapSaga(data) {
  try {
    let response = yield call(networkService.sendSnap, data);
    yield put(sendSnapSuccess(response?.data));
  } catch (error) {
    yield put(sendSnapError(error));
  }
}

export function* watchSendSnapSaga() {
  yield takeLatest(types.SEND_SNAP_REQUEST, sendSnapSaga);
}
