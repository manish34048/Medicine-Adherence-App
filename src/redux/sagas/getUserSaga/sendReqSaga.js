import {call, put, takeLatest} from 'redux-saga/effects';
import {
  sendReqError,
  sendReqSuccess,
} from '../../action/getUserAction/sendReqAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* sendReqSaga(data) {
  try {
    let response = yield call(networkService.sendReq, data);
    yield put(sendReqSuccess(response?.data));
  } catch (error) {
    yield put(sendReqError(error));
  }
}

export function* watchSendReqSaga() {
  yield takeLatest(types.SEND_REQ_REQUEST, sendReqSaga);
}
