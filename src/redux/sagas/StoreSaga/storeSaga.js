import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import { storeError, storeSuccess } from '../../action/StoreAction/storeAction';

export function* storeSaga(data) {
  try {
    let response = yield put(data);
    yield put(storeSuccess(response?.data));
  } catch (error) {
    yield put(storeError(error));
  }
}

export function* watchStoreSaga() {
  yield takeLatest(types.STORE_REQUEST, storeSaga);
}
