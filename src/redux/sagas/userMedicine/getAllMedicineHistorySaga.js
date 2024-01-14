import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {
  getAllMedicineHistoryClear,
  getAllMedicineHistorySuccess,
} from '../../action/userMedicine/getAllMedicineHistoryAction';
import * as types from '../../actionTypes';

export function* getAllMedicineHistorySaga() {
  try {
    const response = yield call(networkService.getAllMedicineHistory);
    yield put(getAllMedicineHistorySuccess(response?.data));
  } catch (error) {
    yield put(getAllMedicineHistoryClear(error));
  }
}
export function* watchGetAllMedicineHistorySaga() {
  yield takeLatest(
    types.GET_ALL_MED_HISTORY_REQUEST,
    getAllMedicineHistorySaga,
  );
}
