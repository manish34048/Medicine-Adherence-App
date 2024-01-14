import {STORAGE} from '../constants/storage';
import LocalStorageHelper from './localStorage';
import _ from 'lodash';
class OfflineHelper {
  getMedicine() {
    return new Promise(async (resolve, reject) => {
      await LocalStorageHelper.getDataFromLocal(STORAGE.MEDICINE_LIST)
        .then(response => {
          if (response) {
            let data = (MedicineList = JSON.parse(response));
            resolve(data);
          } else {
            reject('error');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

let OfflineHelper = new OfflineHelper();
export {OfflineHelper as OfflineHelper};
