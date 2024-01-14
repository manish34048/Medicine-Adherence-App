import {call, put, takeLatest} from 'redux-saga/effects';
import {HTTP_STATUS_CODES} from '../../../constants/statusCodes';
import networkService from '../../../network/networkService';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {
  syncDataError,
  syncDataSuccess,
} from '../../action/userMedicine/syncDataAction';
import * as types from '../../actionTypes';

export function* syncDataSaga(data) {
  try {
    console.log("insaga")
    const response = yield call(networkService.syncData, data);
    console.log(response,"respone saga")
    if (response.status === HTTP_STATUS_CODES.ok) {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let updatedList = data;
          updatedList.map(item => {
            item.isSynced = true;
          });
          AddMedicine(updatedList);
        }
      });
    }
    yield put(syncDataSuccess(response?.data));
  } catch (error) {
    yield put(syncDataError(error));
  }
}
export function* watchSyncDataSaga() {
  yield takeLatest(types.SYNC_DATA_REQUEST, syncDataSaga);
}
