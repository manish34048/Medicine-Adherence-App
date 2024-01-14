import axios from 'axios';
import instance from './instance';
// import {hideMessage} from 'react-native-flash-message';
import * as apiUrl from '../constants/apiUrl';
class RequestService {
  CatchErrorHandler = error => {
    let errorMessage = error;
    if (error === undefined || error === 400 || error === 401) {
      error = '401';
    }
    if (error === 404) {
      error = '404';
    }

    if (
      error.includes('Error: Network Error') ||
      error.includes('Error: Request failed with status code 500')
    ) {
      errorMessage = {
        status: 'Request timed out',
        message: 'validationMessage.500',
      };
    } else if (error.includes('401')) {
      hideMessage();
      Alert.alert(
        'alert.appName',
        'validationMessage.401',
        [
          {
            text: 'alert.ok',
            onPress: () => {
              userDataClearInLocal(() => {
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      errorMessage = {
        status: 'Request timed out',
        message: 'validationMessage.500',
      };
    }
    return errorMessage;
  };

  getRequest(url) {
    return new Promise((resolve, reject) => {
      instance
        .get(url)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          return reject(this.CatchErrorHandler(error.message));
        });
    });
  }

  postRequest(url, object) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, object)
        .then(response => {
          if (url !== apiUrl.LOGIN && response.status === 401) {
            return reject(this.CatchErrorHandler(response.status));
          } else {
            return resolve(response);
          }
        })
        .catch(error => {
          return reject(this.CatchErrorHandler(error.message));
        });
    });
  }

  putRequest(url,object){
    return new Promise((resolve,reject)=>{
      instance
      .put(url,object)
      .then(response=>{
        if (url !== apiUrl.LOGIN && response.status === 401) {
          return reject(this.CatchErrorHandler(response.status));
        } else {
          return resolve(response);
        }
      })
      .catch(error=>{
        return reject(this.CatchErrorHandler(error.message))
      })
    })
  }


  put(url, object) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, object)
        .then(response => {
          if (url !== apiUrl.LOGIN && response.status === 401) {
            return reject(this.CatchErrorHandler(response.status));
          } else {
            return resolve(response);
          }
        })
        .catch(error => {
          return reject(this.CatchErrorHandler(error.message));
        });
    });
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      let instance = instanceWithoutAuth;
      if (auth === 1) {
        instance = instanceWithAuth;
      }
      instance
        .delete(url)
        .then(response => {
          if (
            response.status === 404 ||
            response.status === 401
          ) {
            return reject(this.CatchErrorHandler(response.status));
          } else {
            return resolve(response);
          }
        })
        .catch(error => {
          return reject(this.CatchErrorHandler(error.message));
        });
    });
  }

  sendSnapRequest(url, object, header) {
    return axios.post(url, object, header);
  }
  refreshToken(url, object, header) {
    return axios.post(url, object, header);
  }
  
  addImage(url,object){
    console.log(url,object,"url")
    
    return fetch(url,
      {method:'post',
    body:object}
      )
  }

}
export default new RequestService();
