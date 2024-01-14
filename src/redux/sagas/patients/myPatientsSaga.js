import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  myPatientsError,
  myPatientsSuccess,
} from '../../action/patients/myPatientsAction';
import networkService from '../../../network/networkService';

export function* myPatientsSaga(data) {
  try {
    let response = yield call(networkService.getMyPatients, data);
    yield put(myPatientsSuccess(response?.data));
  } catch (error) {
    yield put(myPatientsError(error));
  }
}

export function* watchMyPatientsSaga() {
  yield takeLatest(types.MY_PATIENTS_REQUEST, myPatientsSaga);
}
