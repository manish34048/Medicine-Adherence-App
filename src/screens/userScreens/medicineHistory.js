import syncHistory from '../../sync/syncHistory';
import {AddMedicine} from '../../utils/storage';
import moment from 'moment';
import {week} from '../../constants/constants';
import uuid from 'react-native-uuid';

const MedicineHistory = (data, dispatch) => {
  let updateArray = [];
  // console.log('med history creation');
  for (let i = 0; i < data?.length; i++) {
    if (data[i].reminderId !== null && !data[i].flag) {
      let arr = data[i].days.split(',');
      let set = new Set(arr);
      let start_date = data[i].startDate;
      let end_date = data[i].endDate;
      let tody_date = new Date();
      let td_da = moment().format('YYYY-MM-DD');
      let history = {
        historyId: null,
        date: null,
        taken: '',
        notTaken: '',
        time: '',
        synced: false,
      };
      if (
        data[i].endDate !== 'No End Date' &&
        set.has(week[tody_date.getDay()]) &&
        start_date <= td_da &&
        td_da <= end_date
      ) {
        if (data[i].historyList.length === 0) {
          // console.log('med history creation');
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime;
          history.notTaken = '';
          history.taken = '';
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          if (
            index >= 0 &&
            data[i].reminderTime !== data[i].historyList[index].time
          ) {
            console.log('Existing Reminder update');
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = '';
            history.taken = '';
            history.synced = false;
            history.time = data[i].reminderTime;
            data[i].historyList[index] = history;
            data[i].totalReminders = 0;
            data[i].currentCount = 0;
          } else if (index < 0) {
            history.historyId = uuid.v4();
            history.date = td_da;
            history.time = data[i].reminderTime;
            history.notTaken = '';
            history.taken = '';
            data[i].historyList.push(history);
          }
        }
      } else if (
        data[i].endDate === 'No End Date' &&
        set.has(week[tody_date.getDay()]) &&
        start_date <= td_da
      ) {
        if (data[i].historyList.length === 0) {
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime;
          history.notTaken = '';
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          if (
            index >= 0 &&
            data[i].reminderTime !== data[i].historyList[index].time
          ) {
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = '';
            history.taken = '';
            history.synced = false;
            history.time = data[i].reminderTime;
            data[i].historyList[index] = history;
            data[i].totalReminders = 0;
            data[i].currentCount = 0;
          } else if (index < 0) {
            // console.log(
            //   'Indisde No End Date update Reminder >> Date not Present',
            // );
            history.historyId = uuid.v4();
            history.date = td_da;
            history.time = data[i].reminderTime;
            history.notTaken = '';
            history.taken = '';
            history.synced = false;
            data[i].historyList.push(history);
          }
        }
      }
      if (td_da > end_date) {
        data[i].reminderStatus = false;
        data[i].isSynced = true;
      }
      // console.log('Medicine after saving history ', data[i]);
    }
    updateArray.push(data[i]);
  }
  // console.log('Updated Med', updateArray);
  updateArray.length !== 0 && AddMedicine(updateArray);
};

export default MedicineHistory;
