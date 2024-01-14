import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getUserError,
  getUserSuccess,
} from '../../action/getUserAction/getUserAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* getUserSaga(data) {
  try {
    let response = yield call(networkService.getUser, data);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* watchGetUserSaga() {
  yield takeLatest(types.GET_USER_REQUEST, getUserSaga);
}
