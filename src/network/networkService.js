import RequestService from './requestService';
import * as apiUrl from '../constants/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HelperPromise} from '../constants/promise';
class NetworkService {
  async login(payload) {
    const {email, token} = payload.payload;
    return await RequestService.postRequest(apiUrl.LOGIN, {
      fcmToken: token,
      email: email,
    });
  }
  async expiry() {
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(`${apiUrl.EXPIRY}?Id=${id}`);
  }
  async refreshToken() {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('refreshToken');
    return await RequestService.refreshToken(
      `${apiUrl.REFRESH_TOKEN}?userId=${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }

  async signUp(payload) {
    const {name, email, photo, token} = payload.payload;
    return RequestService.postRequest(apiUrl.SIGN_UP, {
      userName: name,
      email: email,
      contact: '1234567890',
      picPath: photo,
      fcmToken: token,
    });
  }
  async getMyPatients(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MY_PATIENTS}?caretakerId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async getPatientsRequest(payload) {
    const currentPage = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.PATIENTS_REQUEST}?caretakerId=${id}&pageNo=${currentPage}&pageSize=8&Id=${id}`,
    );
  }
  async getMyCaretaker(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MY_CARETAKER}?patientId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async getCaretakerRequest(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.CARETAKER_REQUEST}?patientId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async searchMedicineRequest(payload) {
    const Id = await AsyncStorage.getItem('user_id');
    const {medicineName, pageNo} = payload.payload;
    return RequestService.getRequest(
      `${apiUrl.SEARCH_MEDICINE}?medicineName=${medicineName}&pageNo=${pageNo}&pageSize=8&Id=${Id}`,
    );
  }
  async putAcceptRequest(payload) {
    console.log(payload,"payoad")
    const requestId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${apiUrl.ACCEPT_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
    );
  }
  async putDeleteRequest(payload) {
    const requestId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${apiUrl.DELETE_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
    );
  }
  async getProfile() {
    const id = await AsyncStorage.getItem('user_id');
    return RequestService.getRequest(
      `${apiUrl.GET_USER}?userId=${id}&Id=${id}`,
    );
  }
  async editProfile(payload) {
    const {
      bio,
      dateOfBirth,
      country,
      bloodGroup,
      contact,
      gender,
      address,
      state,
    } = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return RequestService.putRequest(
      `${apiUrl.EDIT_PROFILE}?userId=${id}&Id=${id}`,
      {
        bio: bio,
        dateOfBirth: dateOfBirth,
        address: address,
        state: state,
        country: country,
        bloodGroup: bloodGroup,
        contact: contact,
        gender: gender,
      },
    );
  }
  async getUserMedicine() {
    const id = await AsyncStorage.getItem('user_id');
    console.log(id,"idididid")
    return await RequestService.getRequest(
      `${apiUrl.USER_MEDICINE}?userId=${id}&Id=${id}`,
    );
  }
  async getPatientMedicine(payload) {
    const Id = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return RequestService.getRequest(
      `${apiUrl.USER_MEDICINE}?userId=${Id}&Id=${id}`,
    );
  }
  async getMyPrescriptions(payload) {
    const {currentPage, Id} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MY_PRESCRIPTIONS}?userId=${Id}&Id=${id}&pageNo=${currentPage}&pageSize=8`,
    );
  }
  async postNotification(payload) {
    const {medName, fcmToken, patientId} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const name = await AsyncStorage.getItem('user_name');
    return await RequestService.postRequest(
      `${apiUrl.NOTIFY_USER}?medName=${medName}&Id=${id}&fcmToken=${fcmToken}&patientId=${patientId}`,
      {
        sender: name,
        message: 'Take Medicine ' + medName,
      },
    );
  }

 async postImage(payload)
 {

 }

  async getMedicineImages(payload) {
    const {medId, pageNo} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MEDICINE_IMAGES}?userMedicineId=${medId}&Id=${id}&pageNo=${pageNo}&pageSize=5`,
    );
  }
  async getPatientMedicineHistory(payload) {
    const {med} = payload.payload;
    let pageNo = payload.payload.pageNo;
    const Id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.GET_MEDICINE_HISTORY}?userMedicineId=${med}&Id=${Id}&pageNo=${pageNo}&pageSize=5`,
    );
  }
  async putDeleteRequest(payload) {
    const requestId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${apiUrl.DELETE_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
    );
  }
  // async putAcceptRequest(payload) {
  //   const requestId = payload.payload;
  //   const id = await AsyncStorage.getItem('user_id');
  //   return await RequestService.putRequest(
  //     `${apiUrl.ACCEPT_REQUEST}?requestId=${requestId}&Id=${id}`,
  //     {},
  //   );
  // }
  async downloadPdf(payload) {
    const medicineId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.DOWNLOAD_PDF}?userMedicineId=${medicineId}&Id=${id}`,
    );
  }

 async addImage(payload){
  const formdata=payload.payload
  console.log(payload.payload,"payload")
  return await RequestService.addImage(
    'https://api.cloudinary.com/v1_1/dfqhduyww/image/upload',
    formdata,
  )
 }

  async sendSnap(payload) {
    const formdata = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    let token = await AsyncStorage.getItem('accessToken');
    return await RequestService.sendSnapRequest(
      `${apiUrl.SEND_SNAP}?Id=${id}`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
  async getUser(payload) {
    const email = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const userName = await AsyncStorage.getItem('user_name');
    return await RequestService.getRequest(
      `${apiUrl.GET_USER_EMAIL}?email=${email}&sender=${userName}&Id=${id}`,
    );
  }
  async sendReq(payload) {
    const {patient_id, sentby, fcmToken} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const body =
      sentby === 'Caretaker'
        ? {
            caretakerId: id,
            patientId: patient_id,
            sentBy: sentby,
            authorized: true,
            fcmToken: fcmToken,
          }
        : {
            caretakerId: patient_id,
            patientId: id,
            sentBy: sentby,
            authorized: true,
            fcmToken: fcmToken,
          };
    return await RequestService.postRequest(
      `${apiUrl.SEND_REQUEST}?Id=${id}`,
      body,
    );
  }
  async getAllNotification(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const {pageNo} = payload;
    return await RequestService.getRequest(
      `${apiUrl.GET_ALL_NOTIFICATION}?Id=${id}&userId=${id}&pageNo=${pageNo}&pageSize=8`,
    );
  }
  async deleteNotification(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const {notificationId} = payload;
    return await RequestService.putRequest(
      `${apiUrl.DELETE_NOTIFICATION}?Id=${id}&notificationId=${notificationId}`,
      {},
    );
  }
  async syncData(payload) {
    const id = await AsyncStorage.getItem('user_id');
    let data = payload.payload;
    console.log(data,"syncdata")
    console.log("syncid",id)
    return HelperPromise.syncMedicine(data, id);
  }
  async syncHistoryDetails(payload) {
    const id = await AsyncStorage.getItem('user_id');
    let {historyList, userMedicineId} = payload.payload;

    return HelperPromise.syncHistoryDetails(historyList, userMedicineId, id);
  }
  async getDoctorAppointment() {
    const id = await AsyncStorage.getItem('user_id');

    return await RequestService.getRequest(
      `${apiUrl.GET_DOCTOR_APPOINTMENT}?Id=${id}&userId=${id}`,
    );
  }

  async getAllMedicineHistory() {
    const id = await AsyncStorage.getItem('user_id');

    return await RequestService.getRequest(
      `${apiUrl.GET_ALL_MEDICINE_HISTORY}?Id=${id}&userId=${id}`,
    );
  }
}
export default new NetworkService();
