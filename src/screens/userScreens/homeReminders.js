import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPallete} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {AddMedicine, getPercentageDetails} from '../../utils/storage';
import moment from 'moment';
import {CustomAlert} from '../../components/atoms/customAlert';
import {useDispatch} from 'react-redux';
import syncHistory from '../../sync/syncHistory';
import syncMedicine from '../../sync/syncMedicine';
import { syncDataRequest } from '../../redux/action/userMedicine/syncDataAction';

const Reminders = ({showAlert, setPercentage, data}) => {
  const dispatch = useDispatch();
  const medData = data;
  console.log(data,"ddddddddd")
  const [reminderList, setReminderList] = useState([]);
  console.log(reminderList,"reminderlist")
  let td_da = moment().format('YYYY-MM-DD');
  let tempList = new Set();

  useEffect(() => {
    display();
    return () => {};
  }, [medData]);

  function display() {
    getPercentageDetails()
      .then(data => {
        if (data != null && data.date != '') {
          let p = getPercentage(medData);
          setPercentage(p);
        }
      })
      .then(() => {
        dailyReminders(medData);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  function totalMedReminders(data, index) {
    let totalMedReminder = 0;
    data[index].historyList.map(h => {
      // console.log(h);
      h.time.split(',').map(t => {
        totalMedReminder += 1;
      });
    });
    return totalMedReminder;
  }

  //This function is used to calculate daily reminders
  function dailyReminders(medicine) {
    setReminderList([]);
    if (medicine.length !== 0) {
      medicine.map((item, index) => {
        item.totalReminders = totalMedReminders(medicine, index);
        item.historyList.map(r => {
          if (r.date === td_da && item.flag === false) {
            r.time.split(',').map(z => {
              if (!(r.taken + r.notTaken).includes(z)) {
                let temp = {};
                temp.userMedicineId = item.userMedicineId;
                temp.medName = item.medicineName;
                temp.historyId = r.historyId;
                temp.time = z;
                temp.date = td_da;
                tempList.add(temp);
                setReminderList([...tempList]);
              }
            });
          }
        });
      });
    } else {
      setReminderList([]);
    }
  }

  //Function to calculate percentage based on marking
  function getPercentage(data) {
    let tr = 0;
    let cc = 0;
    data.map(item => {
      item.historyList.map(k => {
        if (k.date == td_da) {
          tr += item.reminderTime.split(',').length;
          let temp = k.taken.split(',');
          temp.map(i => {
            if (i !== '') {
              cc += 1;
            }
          });
        }
      });
    });
    return Math.floor((cc / tr) * 100);
  }

  //This function is used to check the buffer time before marking the medicine
  function check(reminderTime) {
    let time = new Date();
    let currentTime = time.getHours() + ':' + time.getMinutes();
    let bufferTime = moment(reminderTime, ['h:mm A']).format('HH:mm');
    let bufferHour =
      parseInt(bufferTime.split(':')[0]) === 0
        ? 23
        : parseInt(bufferTime.split(':')[0]) - 1;
    let remTime =
      bufferHour < 10
        ? '0' + bufferHour + ':' + bufferTime.split(':')[1]
        : bufferHour + ':' + bufferTime.split(':')[1];
    if (currentTime < remTime) {
      Alert.alert('Cannot mark at this moment!!', '', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    } else {
      return true;
    }
    return false;
  }

  //This function is used for marking the medicine as taken
  function markingTaken(item) {
    const {userMedicineId, historyId, time, medName} = item;
    medData.forEach(item => {
      if (
        item.userMedicineId == userMedicineId &&
        item.medicineName == medName
      ) {
        item.historyList.map(r => {
          console.log(r,"datahistory")
          if (r.historyId === historyId && !r.taken.includes(time)) {
            if (Number(item.dosageQuantity) > Number(item.stock)) {
              CustomAlert({
                text1: 'You are out of stock ',
                text2: 'Please refill the stock ',
              });
              return;
            } else {
              r.taken = r.taken + time + ',';
              r.synced = false;
              item.currentCount += 1;
              item.stock -= item.dosageQuantity;
              showAlert();
            }
          }
        });
      }
    });
    let percent = getPercentage(medData);
    setPercentage(percent);
    AddMedicine(medData);
    console.log("yes")
    console.log("yes1")
    syncHistory(dispatch, userMedicineId);
    console.log("yes2")
    
  }

  //This function is used for marking the medicine as not taken
  function markingNotTaken(item) {
    const {userMedicineId, historyId, time, medName} = item;
    medData.forEach(item => {
      if (
        item.userMedicineId == userMedicineId &&
        item.medicineName == medName
      ) {
        item.historyList.map(r => {
          if (r.historyId === historyId && !r.notTaken.includes(time)) {
            r.notTaken = r.notTaken + time + ',';
            r.synced = false;
          }
        });
      }
    });
    let percent = getPercentage(medData);
    setPercentage(percent);
    AddMedicine(medData);
    syncHistory(dispatch, userMedicineId);
  }

  const renderItem = (item, index) => {
    const {medName, time} = item;
    return (
      <View key={item.medName + '1'} style={{width: '100%'}}>
        <View style={styles.list} key={item.medName + '2'}>
          <View style={styles.avatarView}>
            <View style={styles.medNameView}>
              <ListItem.Title style={styles.medName}>{time}</ListItem.Title>
              <ListItem.Subtitle
                style={{marginVertical: 2, fontSize: 16, color: 'gray'}}
                numberOfLines={1}>
                {medName}
              </ListItem.Subtitle>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '28%',
            }}
            key={item.medName + 6}>
            <TouchableOpacity
              style={{padding: 8}}
              activeOpacity={1}
              onPress={() => {
                check(time) && markingTaken(item),
                  reminderList.splice(index, 1),
                  setReminderList(reminderList);
              }}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={colorPallete.mainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 8}}
              activeOpacity={1}
              onPress={() => {
                check(time) &&
                  (markingNotTaken(item),
                  display(),
                  reminderList.splice(index, 1),
                  setReminderList(reminderList));
              }}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                color={colorPallete.redPercentageColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {reminderList.length === 0 ? (
          <ScrollView
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.imgContainer}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../assets/images/noremtoday.png')}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colorPallete.backgroundColor,
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={reminderList}
              renderItem={({item, index}) => renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default Reminders;
