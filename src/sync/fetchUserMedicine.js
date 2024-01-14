import {getAllMedicineHistoryClear} from '../redux/action/userMedicine/getAllMedicineHistoryAction';
import {getAppointmentListClear} from '../redux/action/userMedicine/getAppointmentListAction';
import {clearMedicineList} from '../redux/action/userMedicine/medicineListAction';
import {
  AddMedicine,
  getMedicine,
  getPrescription,
  savePrescription,
} from '../utils/storage';
import {StoreProviderService} from '../utils/storeProviderService';

const fetchUserMedicine = async (
  userMedicine,
  appointmentList,
  historyList,
) => {
  console.log(userMedicine,"fetchUserMeds");
  
  let prescriptionList = [];
  getPrescription()
    .then(data => {
      console.log(data,"prescription__data")
      if (data !== null && data?.length !== 0) {
        prescriptionList = data;
      }
    })
    .then(() => {
      getMedicine()
        .then(data => {
          console.log('fetch data at start', data);
          if (data === null || data.length === 0) {
            let updatedList = [];
            userMedicine?.map(item => {
              console.log('before', item);
              console.log(item.prescriptionId,"id")
              if (item.prescriptionId !== null) {
                
                let obj = {
                  doctorName: item.doctorName,
                  prescriptionId: item.prescriptionId,
                  contact: item.contact,
                  prescriptionUrl: item.prescriptionUrl,
                  location: item.location,
                  specialization: item.specialization,
                };

                !prescriptionList.some(
                  ele => ele.prescriptionId === obj.prescriptionId,
                ) && prescriptionList.push(obj);
              }

              item.historyList = [];
              historyList !== null && historyList !==undefined &&
                historyList?.length !== 0 &&
                historyList.map(ele => {
                  if (ele.userMedicineId === item.userMedicineId) {
                    ele.userMedicineHistory.map(r => {
                      r.synced = true;
                    });
                    item.historyList = ele.userMedicineHistory;
                  }
                });

              item.doctorAppointmentList = [];
             if( appointmentList !== null && appointmentList !==undefined &&
                appointmentList?.length !== 0)
                
               
                item.doctorAppointmentList=appointmentList
  
                // appointmentList.map(ele => {
                //   console.log(ele,"ele")
                //   console.log(item,"elev")
                //   if (ele.userMedicineId === item.userMedicineId) {
                //     item.doctorAppointmentList = ele.doctorAppointmentList;
                //   }
                // });

              if (item.reminderId !== null) {
                item.everyday = !item.everyday ? false : true;
                item.noEndDate = !item.noEndDate ? false : true;
                item.reminderStatus = !item.reminderStatus ? false : true;
              }
              item.present = !item.present ? false : true;
              item.flag = !item.flag ? false : true;
              item.isSynced = true;

              // console.log('after', item);

              updatedList.push(item);
            });

            console.log('Updateddata inside null condition', updatedList);

            AddMedicine(updatedList);
            savePrescription(prescriptionList);
          } else if (data.length !== 0) {
            console.log('Data not empty', data);
            let userMedicineList = [];
            let updatedList = data;

            data.map(item => {
              console.log(item.length,"data inside")
              userMedicineList.push(item.userMedicineId);
            });
            
            userMedicine.map(item => {
             console.log(item.length,"items else")
            //  console.log(userMedicineList,"items else else")
              if (!userMedicineList.includes(item.userMedicineId)) {
                console.log(item,"if it is here")
                if (item.prescriptionId !== null) {
                  console.log(item,"prescription not null")
                  let obj = {
                    doctorName: item.doctorName,
                    prescriptionId: item.prescriptionId,
                    contact: item.contact,
                    prescriptionUrl: item.prescriptionUrl,
                    location: item.location,
                    specialization: item.specialization,
                  };
                  // prescriptionList.some(
                  //   ele => ele.prescriptionId === obj.prescriptionId,
                  // ) && prescriptionList.push(obj);
                  prescriptionList.push(obj)
                }
               

                item.historyList = [];
                 console.log(historyList,"hl")
                historyList !== null &&
                  historyList?.length !== 0 &&
                  historyList?.map(ele => {
                    if (ele.userMedicineId === item.userMedicineId) {
                      ele.userMedicineHistory.map(r => {
                        r.synced = true;
                      });
                      item.historyList = ele.userMedicineHistory;
                    }
                  });
                  

                  item.doctorAppointmentList = [];
             if( appointmentList !== null && appointmentList !==undefined &&
                appointmentList?.length !== 0)
                
               
                item.doctorAppointmentList=appointmentList
                  
                item.everyday = !item.everyday ? false : true;
                item.flag = !item.flag ? false : true;
                item.noEndDate = !item.noEndDate ? false : true;
                item.present = !item.present ? false : true;
                item.reminderStatus = !item.reminderStatus ? false : true;
                item.isSynced = true;
                updatedList.push(item);
               
              }
            });

            console.log('Before Pushing Updated data', prescriptionList);
            AddMedicine(updatedList);
            savePrescription(prescriptionList);
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
export default fetchUserMedicine;
