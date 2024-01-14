import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  patientsReqError,
  patientsReqSuccess,
} from '../../action/patients/patientsRequestAction';
import networkService from '../../../network/networkService';

export function* patientsRequestSaga(data) {
  try {
    let response = yield call(networkService.getPatientsRequest, data);
    yield put(patientsReqSuccess(response?.data));
  } catch (error) {
    yield put(patientsReqError(error));
  }
}

export function* watchPatientsRequestSaga() {
  yield takeLatest(types.PATIENT_REQ_REQUEST, patientsRequestSaga);
}
