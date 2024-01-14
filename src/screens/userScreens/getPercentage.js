import {getPercentageDetails, savePercentageDetails} from '../../utils/storage';
import moment from 'moment';

export default function getPercentage(data) {
  let td_da = moment().format('YYYY-MM-DD');
  let tr = 0;
  let cc = 0;
  data.map(item => {
    item.historyList.map(k => {
     console.log(k,"kdata")
      if (k.date === td_da && item.reminderTime !== '') {
        tr += item.reminderTime.split(',').length;
        let temp = k.taken.split(',');
        console.log(temp,"temp")
        temp.map(i => {
          if (i !== '') {
            cc += 1;
          }
        });
      }
    });
  });
  getPercentageDetails().then(data => {
    let obj = [];
    let temp = {};
    if (data === null) {
      temp.date = td_da;
      temp.percentage = Math.floor((cc / tr) * 100);
      obj.push(temp);
      savePercentageDetails(obj);
    } else if (data !== null && data.length !== 0) {
      obj = data;
      obj.map((item, index) => {
        const a = b => b.date == td_da;
        if (item.date === td_da) {
          item.percentage = Math.floor((cc / tr) * 100);
          obj[index] = item;
        } else if (!obj.some(a) && tr !== 0) {
          temp.date = td_da;
          temp.percentage = Math.floor((cc / tr) * 100);
          obj.push(temp);
        }
      });
      savePercentageDetails(data);
    }
  });
  console.log(cc,tr,"datadata")
  return Math.floor((cc / tr) * 100);
}