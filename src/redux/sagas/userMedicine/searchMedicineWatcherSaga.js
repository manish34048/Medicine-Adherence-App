import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  searchMedicineError,
  searchMedicineSuccess,
} from '../../action/userMedicine/searchMedicineAction';
import * as types from '../../actionTypes';

export function* searchMedicineWorkerSaga(data) {
  try {
    const response = yield call(networkService.searchMedicineRequest, data);
    yield put(searchMedicineSuccess(response?.data));
  } catch (err) {
    yield put(searchMedicineError(err));
  }
}

export function* searchMedicineWatcherSaga() {
  yield takeLatest(types.SEARCH_MEDICINE_REQUEST, searchMedicineWorkerSaga);
}
