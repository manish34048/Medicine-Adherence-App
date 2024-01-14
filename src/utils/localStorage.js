import {STORAGE} from '../constants/storage';
import SInfo from 'react-native-sensitive-info';

export default class LocalStorageHelper {
  static storeValueToLocal = (key, value) => {
    return new Promise(function (success, failed) {
      SInfo.setItem(key, value, {
        sharedPreferencesName: STORAGE.SHARED_PREFERENCES_NAME,
        keychainService: STORAGE.KEY_CHAIN_NAME,
      })
        .then(res => {
          if (res !== null) {
            success(true);
          } else {
            failed(false);
          }
        })
        .catch(error => {
          failed(error);
          console.log(error.message, error.code);
        });
    });
  };

  static getDataFromLocal = key => {
    return new Promise(function (success, failed) {
      try {
        SInfo.getItem(key, {
          sharedPreferencesName: STORAGE.SHARED_PREFERENCES_NAME,
          keychainService: STORAGE.KEY_CHAIN_NAME,
        }).then(value => {
          if (value !== null && value !== undefined) {
            success(value);
          } else {
            success('');
          }
        });
      } catch (error) {
        failed(error);
      }
    });
  };

  static deleteDataFromLocal = key => {
    return new Promise(function (success, failed) {
      SInfo.deleteItem(key, {
        sharedPreferencesName: STORAGE.SHARED_PREFERENCES_NAME,
        keychainService: STORAGE.KEY_CHAIN_NAME,
      })
        .then(() => {
          success(true);
        })
        .catch(error => {
          failed(error);
          console.log(error);
        });
    });
  };
}
