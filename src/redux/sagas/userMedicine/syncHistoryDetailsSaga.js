import {call, put, takeLatest} from 'redux-saga/effects';
import networkService from '../../../network/networkService';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {HTTP_STATUS_CODES} from '../../../constants/statusCodes';
import {
  syncHistoryDetailsError,
  syncHistoryDetailsSuccess,
} from '../../action/userMedicine/syncHistoryDetailsAction';
import * as types from '../../actionTypes';

export function* syncHistoryDetailsSaga(data) {
  try {
    const response = yield call(networkService.syncHistoryDetails, data);
    if (response.status === HTTP_STATUS_CODES.ok) {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          let updatedList = data;
          updatedList.map(item => {
            if (item.historyList.length !== 0) {
              item.historyList.map(ele => {
                ele.synced = true;
              });
            }
          });
          AddMedicine(updatedList);
        }
      });
    }
    yield put(syncHistoryDetailsSuccess(response?.data));
  } catch (error) {
    yield put(syncHistoryDetailsError(error));
  }
}
export function* watchSyncHistoryDetailsSaga() {
  yield takeLatest(types.SYNC_HISTORY_DETAILS_REQUEST, syncHistoryDetailsSaga);
}
