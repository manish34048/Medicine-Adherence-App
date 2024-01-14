import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  medicineImagesError,
  medicineImagesSuccess,
} from '../../action/patients/medicineImagesAction';
import networkService from '../../../network/networkService';

export function* medicineImagesSaga(data) {
  try {
    let response = yield call(networkService.getMedicineImages, data);
    yield put(medicineImagesSuccess(response?.data));
  } catch (error) {
    yield put(medicineImagesError(error));
  }
}

export function* watchMedicineImagesSaga() {
  yield takeLatest(types.USER_MED_IMAGES_REQUEST, medicineImagesSaga);
}
