import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  userMedicineListError,
  userMedicineListSuccess,
} from '../../action/patients/userMedicineListAction';
import * as types from '../../actionTypes';

export function* userMedicineListWorkerSaga(data) {
  try {
    const response = yield call(networkService.getPatientMedicine, data);
    yield put(userMedicineListSuccess(response?.data));
  } catch (error) {
    yield put(userMedicineListError(error));
  }
}
export function* userMedicineListWatcherSaga() {
  yield takeLatest(
    types.USER_MEDICINE_LIST_REQUEST,
    userMedicineListWorkerSaga,
  );
}
