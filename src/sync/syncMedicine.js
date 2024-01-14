import { useDispatch } from 'react-redux';
import {
  syncDataClear,
  syncDataRequest,
} from '../redux/action/userMedicine/syncDataAction';
import { AddMedicine, getMedicine, getPrescription, savePrescription } from '../utils/storage';
import { getToken } from '../utils/storage';
import { getId } from '../utils/storage';
import { StoreProviderService } from '../utils/storeProviderService';
import { S3_IMAGE_UPLOAD } from '../constants/apiUrl';
import Toast from 'react-native-toast-message';
import {
  ErrorToast
} from '../components/atoms/customToast'
var id
var token 

var final


// const funct = async (data) => {
//   const a = data
//   let i = 0
//   while (i < data.length) {
//     let newFile = {
//       uri: (a[i].prescriptionUrl),
//       type: 'image/jpeg',
//       name: 'test.jpg'
//     }
//     const data = new FormData()
//     data.append('file', newFile)
//     data.append('upload_preset', 'medStick')
//     data.append('cloud_name', 'dfqhduyww')

//     try {
//       await fetch("https://api.cloudinary.com/v1_1/dfqhduyww/image/upload", {
//         method: 'post',
//         body: data
//       }).then(res => res.json()).then(data => {
//         i++
//         console.log("data", data)
//         return data.url

//       })
//     }
//     catch (err) {
//       console.log(err, 'error')
//       i++
//     }
//   }

// }

async function syncMedicine(dispatch) {
  if (
    StoreProviderService.internetStatus &&
    StoreProviderService.userLoggedIn
  ) {
    
  getPrescription().then(data=>{
    console.log("pdata",data)
  })

    getId().then(data=>{
      id=data
      console.log(id,"id")
    })

    getToken().then(data=>{
      token=data
      console.log(token,"token")
    })

    getMedicine()
      .then(data => {

        console.log('sync Data arry', data);

        if (data !== null && data.length !== 0) {
          let updatedList = data;
          let syncArray = [];
          let prescriptionArray=[]
          updatedList.map(item => {
            if (item.isSynced === false &&  item.prescriptionId !==null) {
              let newFile = {
                uri: (item.prescriptionUrl),
                type: 'image/jpeg',
                name: 'test.jpg'
              }

              const data = new FormData()
              
              data.append('file', newFile)
              // data.append('upload_preset', 'medStick')
              // data.append('cloud_name', 'dfqhduyww')

              try {
                 fetch(`${S3_IMAGE_UPLOAD}?Id=${id}`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: data
                 
                }).then(res => res.json()).then(data=>{
                  console.log("data", data)
                  final=data.result
                  console.log(final,"final url")
              if(data.status=== 'Success')
              {
              let obj = {
                userMedicineDetailId: item.userMedicineDetailId,
                userMedicineId: item.userMedicineId,
                medicineId: item.medicineId,
                medicineName: item.medicineName,
                description: item.description,
                present: item.present,
                dosageType: item.dosageType,
                dosageQuantity: item.dosageQuantity,
                dosagePower: item.dosagePower,
                stock: item.stock,
                leftStock: item.leftStock,
                reminderId: item.reminderId,
                startDate: item.startDate,
                endDate: item.endDate,
                days: item.days,
                reminderTitle: item.reminderTitle,
                reminderTime: item.reminderTime,
                everyday: item.everyday,
                noEndDate: item.noEndDate,
                reminderStatus: item.reminderStatus,
                frequency: item.frequency,
                beforeAfter: item.beforeAfter,
                totalReminders: item.totalReminders,
                currentCount: item.currentCount,
                prescriptionId: item.prescriptionId,
                doctorName: item.doctorName,
                specialization: item.specialization,
                contact: item.contact,
                location: item.location,
                prescriptionUrl: final,
                doctorAppointmentList: item.doctorAppointmentList,
                flag: item.flag,
              }
              let prescription0bj={
               contact: item.contact,
               doctorName: item.doctorName,
               flag : item.flag,
               location: item.location,
               prescriptionId: item.prescriptionId,
               prescriptionUrl: final,
               specialization: item.specialization
              }
              console.log(obj,"obj")
              console.log(prescription0bj,"obj1")
                ;
              syncArray.push(obj);
              prescriptionArray.push(prescription0bj)
              // savePrescription(prescriptionArray)
              // console.log(syncArray,"syncarray")
              // console.log('syncing Array inside', syncArray)
              syncArray?.length !== 0 ? dispatch(syncDataRequest(syncArray)) : null;
        
            StoreProviderService.dispatch(syncDataClear());
      
                  }
                else if(data.status === 'Failed')
              {
                console.log("error")
                ErrorToast({
                  text1: 'Network Issue',
                  position: 'bottomt',
                  text2:'Try again later'
                });
                return 
              }    })
        
        }
            catch (err) {
              console.log(err, 'error')
            }
         
            }

              console.log(item.isSynced,item.userMedicineDetailId,"isSynced")

            if(item.isSynced ===false && item.prescriptionUrl ===null)
            {
              let obj = {
                userMedicineDetailId: item.userMedicineDetailId,
                userMedicineId: item.userMedicineId,
                medicineId: item.medicineId,
                medicineName: item.medicineName,
                description: item.description,
                present: item.present,
                dosageType: item.dosageType,
                dosageQuantity: item.dosageQuantity,
                dosagePower: item.dosagePower,
                stock: item.stock,
                leftStock: item.leftStock,
                reminderId: item.reminderId,
                startDate: item.startDate,
                endDate: item.endDate,
                days: item.days,
                reminderTitle: item.reminderTitle,
                reminderTime: item.reminderTime,
                everyday: item.everyday,
                noEndDate: item.noEndDate,
                reminderStatus: item.reminderStatus,
                frequency: item.frequency,
                beforeAfter: item.beforeAfter,
                totalReminders: item.totalReminders,
                currentCount: item.currentCount,
                prescriptionId: item.prescriptionId,
                doctorName: item.doctorName,
                specialization: item.specialization,
                contact: item.contact,
                location: item.location,
                prescriptionUrl: item.prescriptionUrl,
                doctorAppointmentList: item.doctorAppointmentList,
                flag: item.flag,
              };
              syncArray.push(obj);
              syncArray?.length !== 0 ? dispatch(syncDataRequest(syncArray)) : null;
           console.log(syncArray,"syncarray1")
            StoreProviderService.dispatch(syncDataClear());
            }

          });
          // console.log('syncing Array', syncArray);
          
        }
        
      })
      .catch(err => console.log(err));
  } else return;
}

export default syncMedicine;