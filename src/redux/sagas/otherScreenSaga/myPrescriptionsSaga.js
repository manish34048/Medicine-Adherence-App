import {call, put, takeLatest} from 'redux-saga/effects';
import {
  myPrescriptionsError,
  myPrescriptionsSuccess,
} from '../../action/otherScreenAction/prescriptionsAction';
import * as types from '../../actionTypes';
import networkService from '../../../network/networkService';

export function* myPrescriptionsSaga(data) {
  try {
    let response = yield call(networkService.getMyPrescriptions, data);
    yield put(myPrescriptionsSuccess(response?.data));
  } catch (error) {
    yield put(myPrescriptionsError(error));
  }
}

export function* watchMyPrescriptionsSaga() {
  yield takeLatest(types.MY_PRESCRIPTIONS_REQUEST, myPrescriptionsSaga);
}
