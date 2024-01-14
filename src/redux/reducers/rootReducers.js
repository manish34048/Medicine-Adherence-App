import {combineReducers} from 'redux';
import {editProfileReducer} from './profileReducer/editProfileReducer';
import {signInReducer} from './loginReducer/loginReducer';
import {acceptPatientReqReducer} from './patients/acceptPatientReqReducer';
import {deletePatientReqReducer} from './patients/deletePatientReqReducer';
import {myPatientsReducer} from './patients/myPatientsReducer';
import {patientsRequestReducer} from './patients/patientsRequestReducer';
import {signUpReducer} from './signUpReducer/signUpReducer';
import {sendSnapReducer} from './otherScreenReducer/sendSnapReducer';
import {myPrescriptionsReducer} from './otherScreenReducer/myPrescriptionsReducer';
import {getUserProfileReducer} from './profileReducer/getUserProfileReducer';
import getAllNotificationReducer from './notification/getAllNotificationReducer';
import deleteNotificationReducer from './notification/deleteNotificationReducer';
import {myCaretakerReducer} from './caretaker/myCaretakerReducer';
import {caretakerRequestReducer} from './caretaker/caretakerRequestReducer';
import {acceptCaretakerReqReducer} from './caretaker/acceptCaretakerReqReducer';
import {deleteCaretakerReqReducer} from './caretaker/deleteCaretakerReqReducer';
import {searchMedicineReducer} from './userMedicine/searchMedicineReducer';
import {medicineListReducer} from './userMedicine/medicineListReducer';
import {getPatientHistoryReducer} from './patients/getPatientHistoryReducer';
import {sendRequestReducer} from './getUserReducer/sendReqReducer';
import {getUserReducer} from './getUserReducer/getUserReducer';
import {notifyUserReducer} from './patients/notifyUserReducer';
import {medicineImagesReducer} from './patients/medicineImagesReducer';
import {downloadPdfReducer} from './otherScreenReducer/downloadPdfReducer';
import {saveInternetConnectivityReducer} from './loginReducer/saveInternetConnectivityReducer';
import {saveUserLoggedInReducer} from './loginReducer/saveUserLoggedInReducer';
import {syncDataReducer} from './userMedicine/syncDataReducer';
import {refreshReducer} from './signUpReducer/refreshReducer';
import {expiryReducer} from './signUpReducer/expiryReducer';
import {syncHistoryDetailsReducer} from './userMedicine/syncHistoryDetailsReducer';
import {getAppointmentListReducer} from './userMedicine/getAppointmentListReducer';
import {getAllMedicineHistoryReducer} from './userMedicine/getAllMedicineHistoryReducer';
import {userMedicineListReducer} from './patients/userMedicineListReducer';
import { addImageReducer } from './userMedicine/addImageReducer';
const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  medicineList: medicineListReducer,
  myPatients: myPatientsReducer,
  patientsRequest: patientsRequestReducer,
  acceptPatientRequest: acceptPatientReqReducer,
  deletePatientRequest: deletePatientReqReducer,
  editProfile: editProfileReducer,
  sendSnap: sendSnapReducer,
  myPrescriptions: myPrescriptionsReducer,
  getUserProfile: getUserProfileReducer,
  getAllNotificationReducer: getAllNotificationReducer,
  deleteNotificationReducer: deleteNotificationReducer,
  myCaretaker: myCaretakerReducer,
  caretakerRequest: caretakerRequestReducer,
  acceptCaretakerRequest: acceptCaretakerReqReducer,
  deleteCaretakerRequest: deleteCaretakerReqReducer,
  getPatientHistory: getPatientHistoryReducer,
  searchMedicine: searchMedicineReducer,
  getUser: getUserReducer,
  sendRequest: sendRequestReducer,
  notifyUser: notifyUserReducer,
  medicineImages: medicineImagesReducer,
  downloadPdf: downloadPdfReducer,
  internetConnectivity: saveInternetConnectivityReducer,
  userInfo: saveUserLoggedInReducer,
  syncData: syncDataReducer,
  refresh: refreshReducer,
  expiry: expiryReducer,
  syncHistory: syncHistoryDetailsReducer,
  appointmentList: getAppointmentListReducer,
  allMedicineHistory: getAllMedicineHistoryReducer,
  patientMedicineList: userMedicineListReducer,
  addImage:addImageReducer,
});

export default rootReducer;
