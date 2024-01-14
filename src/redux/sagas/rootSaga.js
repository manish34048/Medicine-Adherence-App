import {all} from 'redux-saga/effects';
import {watchLoginSaga} from './loginSaga/loginSaga';
import {watchMyPatientsSaga} from './patients/myPatientsSaga';
import {watchSignUpSaga} from './signUpSaga/signUpSaga';
import {watchEditProfileSaga} from './profileSaga/editProfileSaga';
import {watchPatientsRequestSaga} from './patients/patientsRequestSaga';
import {watchAcceptPatientReqSaga} from './patients/acceptPatientReqSaga';
import {watchSendSnapSaga} from './otherScreenSaga/sendSnapSaga';
import {medicineListWatcherSaga} from './userMedicine/medicineListWatcherSaga';
import {watchMyPrescriptionsSaga} from './otherScreenSaga/myPrescriptionsSaga';
import {watchGetUserProfileSaga} from './profileSaga/getUserProfileSaga';
import {getAllNotificationWatcherSaga} from './notification/getAllNotificationWatcherSaga';
import {deleteNotificationWatcherSaga} from './notification/deleteNotificationWatcherSaga';
import {watchMyCaretakerSaga} from './caretaker/myCaretakerSaga';
import {watchCaretakerRequestSaga} from './caretaker/caretakerRequestSaga';
import {watchAcceptCaretakerReqSaga} from './caretaker/acceptCaretakerReqSaga';
import {watchDeleteCaretakerReqSaga} from './caretaker/deleteCaretakerReqSaga';
import {watchGetUserSaga} from './getUserSaga/getUserSaga';
import {watchSendReqSaga} from './getUserSaga/sendReqSaga';
import {watchNotifyUserSaga} from './patients/notifyUserSaga';
import {watchMedicineImagesSaga} from './patients/medicineImagesSaga';
import {watchDownloadPdf} from './otherScreenSaga/downloadPdfSaga';
import {searchMedicineWatcherSaga} from './userMedicine/searchMedicineWatcherSaga';
import {watchDeletePatientReqSaga} from './patients/deletePatientReqSaga';
import {watchSyncDataSaga} from './userMedicine/syncDataSaga';
import {watchRefreshSaga} from './signUpSaga/refreshSaga';
import {watchExpirySaga} from './signUpSaga/expirySaga';
import {watchGetAppointmentListSaga} from './userMedicine/getAppointmentListSaga';
import {watchGetAllMedicineHistorySaga} from './userMedicine/getAllMedicineHistorySaga';
import {watchSyncHistoryDetailsSaga} from './userMedicine/syncHistoryDetailsSaga';
import {watchGetPatientHistorySaga} from './patients/getPatientHistorySaga';
import {userMedicineListWatcherSaga} from './otherScreenSaga/userMedicineListSaga';
import { addImageWatcherSaga } from './userMedicine/addImageSaga';
export default function* RootSaga() {
  yield all([
    watchLoginSaga(),
    watchSignUpSaga(),
    watchMyPatientsSaga(),
    watchEditProfileSaga(),
    watchPatientsRequestSaga(),
    watchAcceptPatientReqSaga(),
    watchDeletePatientReqSaga(),
    watchSendSnapSaga(),
    medicineListWatcherSaga(),
    watchMyPrescriptionsSaga(),
    watchGetUserProfileSaga(),
    getAllNotificationWatcherSaga(),
    watchMyCaretakerSaga(),
    watchCaretakerRequestSaga(),
    watchAcceptCaretakerReqSaga(),
    watchDeleteCaretakerReqSaga(),
    watchGetUserSaga(),
    watchSendReqSaga(),
    watchNotifyUserSaga(),
    watchMedicineImagesSaga(),
    deleteNotificationWatcherSaga(),
    watchDownloadPdf(),
    searchMedicineWatcherSaga(),
    watchSyncDataSaga(),
    watchSyncHistoryDetailsSaga(),
    watchRefreshSaga(),
    watchExpirySaga(),
    watchGetAppointmentListSaga(),
    watchGetAllMedicineHistorySaga(),
    watchGetPatientHistorySaga(),
    userMedicineListWatcherSaga(),
    addImageWatcherSaga(),
  ]);
}
