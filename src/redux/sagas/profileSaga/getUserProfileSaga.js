import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getUserProfileError,
  getUserProfileSuccess,
} from '../../action/profileAction/getUserProfileAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* getUserProfileSaga() {
  try {
    let response = yield call(networkService.getProfile);
    yield put(getUserProfileSuccess(response.data));
  } catch (error) {
    yield put(getUserProfileError(error));
  }
}
export function* watchGetUserProfileSaga() {
  yield takeLatest(types.USER_PROFILE_REQUEST, getUserProfileSaga);
}
