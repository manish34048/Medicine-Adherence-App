import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deleteCaretakerReqError,
  deleteCaretakerReqSuccess,
} from '../../action/caretaker/deleteCaretakerReqAction';
import networkService from '../../../network/networkService';

export function* deleteCaretakerRequestSaga(data) {
  try {
    let response = yield call(networkService.putDeleteRequest, data);
    yield put(deleteCaretakerReqSuccess(response?.data));
  } catch (error) {
    yield put(deleteCaretakerReqError(error));
  }
}

export function* watchDeleteCaretakerReqSaga() {
  yield takeLatest(
    types.DELETE_CARETAKER_REQ_REQUEST,
    deleteCaretakerRequestSaga,
  );
}
