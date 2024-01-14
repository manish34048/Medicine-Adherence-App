import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  acceptCaretakerReqError,
  acceptCaretakerReqSuccess,
} from '../../action/caretaker/acceptCaretakerReqAction';
import networkService from '../../../network/networkService';

export function* acceptCaretakerRequestSaga(data) {
  try {
    let response = yield call(networkService.putAcceptRequest, data);
    yield put(acceptCaretakerReqSuccess(response?.data));
  } catch (error) {
    yield put(acceptCaretakerReqError(error));
  }
}

export function* watchAcceptCaretakerReqSaga() {
  yield takeLatest(
    types.ACCEPT_CARETAKER_REQ_REQUEST,
    acceptCaretakerRequestSaga,
  );
}
