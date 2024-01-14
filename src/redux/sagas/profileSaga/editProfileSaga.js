import {call, put, takeLatest} from 'redux-saga/effects';
import {
  editProfileError,
  editProfileSuccess,
} from '../../action/profileAction/editProfileAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* editProfileSaga(data) {
  try {
    let response = yield call(networkService.editProfile, data);
    yield put(editProfileSuccess(response.data));
  } catch (error) {
    yield put(editProfileError(error));
  }
}

export function* watchEditProfileSaga() {
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfileSaga);
}
