import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  acceptPatientReqError,
  acceptPatientReqSuccess,
} from '../../action/patients/acceptPatientReqAction';
import networkService from '../../../network/networkService';

export function* acceptPatientRequestSaga(data) {
  try {
    let response = yield call(networkService.putAcceptRequest, data);
    console.log(response,"response")
    yield put(acceptPatientReqSuccess(response?.data));
  } catch (error) {
    yield put(acceptPatientReqError(error));
  }
}

export function* watchAcceptPatientReqSaga() {
  yield takeLatest(types.ACCEPT_PATIENT_REQ_REQUEST, acceptPatientRequestSaga);
}
