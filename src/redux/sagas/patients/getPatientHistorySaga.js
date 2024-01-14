import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  getPatientHistoryError,
  getPatientHistorySuccess,
} from '../../action/patients/getPatientHistoryAction';
import networkService from '../../../network/networkService';

export function* getPatientHistorySaga(data) {
  try {
    let response = yield call(networkService.getPatientMedicineHistory, data);
    yield put(getPatientHistorySuccess(response?.data));
  } catch (error) {
    yield put(getPatientHistoryError(error));
  }
}

export function* watchGetPatientHistorySaga() {
  yield takeLatest(types.GET_PATIENT_HISTORY_REQUEST, getPatientHistorySaga);
}
