import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService.js';
import { refreshError, refreshSuccess } from '../../action/signUpAction/refreshAction.js';

export function* refreshSaga() {
  try {
    let response = yield call(networkService.refreshToken);
    yield put(refreshSuccess(response?.data));
  } catch (error) {
    yield put(refreshError(error));
  }
}

export function* watchRefreshSaga() {
  yield takeLatest(types.REFRESH_REQUEST, refreshSaga);
}
