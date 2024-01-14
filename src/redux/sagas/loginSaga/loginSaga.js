import {call, put, takeLatest} from 'redux-saga/effects';
import {loginError, loginSuccess} from '../../action/loginAction/loginAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* loginSaga(payload) {
  try {
    let response = yield call(networkService.login, payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}
