import { syncDataRequest } from '../redux/action/userMedicine/syncDataAction';
import {syncHistoryDetailsRequest} from '../redux/action/userMedicine/syncHistoryDetailsAction';
import {getMedicine} from '../utils/storage';
import {StoreProviderService} from '../utils/storeProviderService';

const syncHistory = dispatch => {
  if (
    StoreProviderService.internetStatus &&
    StoreProviderService.userLoggedIn
  ) {
    getMedicine()
      .then(data => {
        console.log(data,"datainsidesync ")
        if (data !== null && data.length !== 0) {
          let historyList = [];
          data.map(ele => {
            if (ele.historyList.length !== 0) {
              ele.historyList.map(r => {
                if (r.synced === false) {
                  let obj = {
                    date: r.date,
                    historyId: r.historyId,
                    notTaken: r.notTaken,
                    taken: r.taken,
                    time: r.time,
                  };
                  historyList.push(obj);
                }
              });
            }

            historyList.length !== 0 &&
              dispatch(
                syncHistoryDetailsRequest({
                  historyList: historyList,
                  userMedicineId: ele.userMedicineId,
                }),
                
              );
              dispatch(syncDataRequest(data)) 
          });
        }
      })
      .catch(err => console.log(err));
  }
};

export default syncHistory;
