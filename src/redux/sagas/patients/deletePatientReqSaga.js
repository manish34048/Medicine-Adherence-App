import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  deletePatientReqError,
  deletePatientReqSuccess,
} from '../../action/patients/deletePatientReqAction';
import networkService from '../../../network/networkService';

export function* deletePatientRequestSaga(data) {
  try {
    let response = yield call(networkService.putDeleteRequest, data);
    yield put(deletePatientReqSuccess(response?.data));
  } catch (error) {
    yield put(deletePatientReqError(error));
  }
}

export function* watchDeletePatientReqSaga() {
  yield takeLatest(types.DELETE_PATIENT_REQ_REQUEST, deletePatientRequestSaga);
}
