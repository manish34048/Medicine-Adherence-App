import * as apiUrl from '../constants/apiUrl';
import requestService from '../network/requestService';
class HelperPromise {
  syncMedicine = async (data, id) => {
    
    let response = await requestService.postRequest(
      `${apiUrl.SYNC_DATA}?userId=${id}&Id=${id}`,
      data,
    );
    console.log(response,"response in sync")
    return response;
  };
  syncHistoryDetails = async (historyList, userMedicineId, id) => {
    let response = await requestService.postRequest(
      `${apiUrl.SYNC_HISTORY_DETAILS}?Id=${id}&userMedicineId=${userMedicineId}`,
      historyList,
    );
    return response;
  };
}

const helperPromise = new HelperPromise();
export {helperPromise as HelperPromise};
