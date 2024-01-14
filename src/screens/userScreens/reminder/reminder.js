import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {day_data, months, todayDay} from './pushNotification/timeData';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './reminderStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPallete} from '../../../components/atoms/colorPalette';
import moment from 'moment';
import {hour} from '../../../constants/constants';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import Notifications from '../../../pushNotification/pushNotifications';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import uuid from 'react-native-uuid';
import {CustomAlert} from '../../../components/atoms/customAlert';
import {ErrorToast, SuccessToast} from '../../../components/atoms/customToast';
import {horizontalScale} from '../../../components/atoms/constant';
import CustomTooltip from '../../../components/atoms/customTooltip';

const Reminder = ({route, navigation}) => {
  let item = route?.params.data;
  let medId = route?.params.medId;

  const [picker, pickerstate] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [selecteddaysItems, slecteddaysstate] = useState([]);
  const [load, loadstate] = useState(false);
  const [startDate, setStartDate] = useState(
    item?.startDate !== null ? new Date(item?.startDate) : new Date(),
  );
  const [endDate, endDateState] = useState(
    item?.endDate !== null
      ? item?.endDate !== 'No End Date'
        ? new Date(item?.endDate)
        : item?.endDate
      : new Date(),
  );
  const [check1, setCheck1] = useState(
    item?.everyday !== null ? item?.everyday : false,
  );
  const [check2, setCheck2] = useState(
    item?.everyday !== null && item?.everyday === false ? true : false,
  );
  const [title, titlestate] = useState(
    item?.reminderTitle !== null ? item?.reminderTitle : '',
  );
  const [time_picker_mode, time_picker_mode_state] = useState(false);
  const [timearray, timearraystate] = useState([]);
  const [food, setFood] = useState(item?.beforeAfter);
  const [frequency, setFrequency] = useState([]);
  const [breakfastTouchable, setBreakfastTouchable] = useState(false);
  const [lunchTouchable, setLunchTouchable] = useState(false);
  const [dinnerTouchable, setDinnerTouchable] = useState(false);
  const [noEndDate, setNoEndDate] = useState(false);
  let reminderStatus = true;
  let td_da = moment().format('YYYY-MM-DD');
  const totalReminders = 0;
  const currentCount = 0;
  const [foodBefore, setFoodBefore] = useState(
    item?.beforeAfter === 'Before' ? true : false,
  );
  const [foodAfter, setFoodAfter] = useState(
    item?.beforeAfter === 'After' ? true : false,
  );
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [fDateSecondary, setfDate] = useState(
    item?.endDate !== null
      ? item?.endDate !== 'No End Date'
        ? item?.endDate
        : 'No End Date'
      : startDate.getFullYear() +
          '-' +
          (startDate.getMonth() + 1) +
          '-' +
          startDate.getDate(),
  );

  let fDatePrimary =
    startDate.getFullYear() +
    '-' +
    (startDate.getMonth() + 1) +
    '-' +
    startDate.getDate();

  useEffect(() => {

    if (item !== null) {
      
      if (item.days !== '') {
        let days = item.days?.split(',');
        if (days?.length !== 7) {
          slecteddaysstate(days);
        }
      }
      if (item.frequency !== null) {
        let frequency = item.frequency.split(',');

        frequency.map(ele => {
          if (ele === 'Breakfast') {
            setBreakfastTouchable(true);
            setBreakfast(true);
          } else if (ele === 'Lunch') {
            setLunchTouchable(true);
            setLunch(true);
          } else if (ele === 'Dinner') {
            setDinnerTouchable(true);
            setDinner(true);
          }
        });
      }
    }
    return () => false;
  }, [item]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPallete.basicColor,
          paddingHorizontal: 16,
        },
      });
  }, [navigation]);

  const onSelecteddaysItemsChange = selectedi => {
    slecteddaysstate(selectedi);
  };
  const hideDatePicker = () => {
    pickerstate(false);
  };

  const titlechange = txt => {
    titlestate(txt);
  };
  const hideDatePickerfortime = () => {
    time_picker_mode_state(false);
  };

  const handlePushNotification = (
    obj,
    check1,
    endDate,
    check2,
    lengthSelectedDays,
  ) => {
    let d = new Date(); // for now
    let currentTime =
      d.getHours() +
      ':' +
      (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());

    let number = [];

    let reminderTime = obj.reminderTime.split(',');

    for (let i = 0; i < reminderTime.length; i++) {
      if (reminderTime[i] !== '')
        number.push(moment(reminderTime[i], ['h:mm A']).format('HH:mm'));
    }

    let chosenDate = new Date(obj?.startDate).getTime() + 24 * 60 * 60 * 1000;
    let chosenDate1 = new Date(chosenDate);
    let chosenDate2 =
      chosenDate1.getFullYear() +
      '-' +
      (chosenDate1.getMonth() + 1) +
      '-' +
      chosenDate1.getDate();

    for (let i = 0; i < number.length; i++) {
      if (number[i] < currentTime) {
        let dateTime = moment(chosenDate2 + ' ' + number[i]);
        Notifications.schduleNotification(
          dateTime._d,
          check1,
          obj.medicineName,
          endDate,
          check2,
          lengthSelectedDays,
          number[i],
        );
      } else {
        let dateTime = moment(obj.startDate + ' ' + number[i]);
        Notifications.schduleNotification(
          dateTime._d,
          check1,
          obj.medicineName,
          endDate,
          check2,
          lengthSelectedDays,
          number[i],
        );
      }
    }
  };

  function getEndDate(params) {
    if (params.getTime() <= startDate.getTime()) {
      setNoEndDate(true);
      setfDate('No End Date');
    } else {
      endDateState(params);
      setfDate(
        params.getFullYear() +
          '-' +
          (params.getMonth() + 1) +
          '-' +
          params.getDate(),
      );
    }
  }

  const handleConfirm = date => {
    pickerstate(false);
    setStartDate(date);
  };

  const handleConfirmfortime = date => {
    let timings = null;
    if (date.getHours() > 11) {
      timings = hour[date.getHours()] + ':' + date.getMinutes() + ' PM';
      if (!timearray.includes(timings)) {
        timearray[currentIndex] =
          hour[date.getHours()] + ':' + date.getMinutes() + ' PM';
      } else {
        CustomAlert({text1: 'Cannot add same timings'});
        time_picker_mode_state(true);
      }
    } else {
      if (date.getHours() >= 0 && date.getHours() <= 11) {
        timings = date.getHours() + ':' + date.getMinutes() + ' AM';
        if (!timearray.includes(timings)) {
          timearray[currentIndex] =
            date.getHours() + ':' + date.getMinutes() + ' AM';
        } else {
          CustomAlert({text1: 'Cannot add same timings'});
          time_picker_mode_state(true);
        }
      } else {
        CustomAlert({
          text1: 'Add breakfast timing between',
          text2: '1:00 AM to 11:00 AM',
        });
      }
    }

    hideDatePickerfortime();
  };

  function frequencyHandler() {
    if (breakfast) {
      frequency.push('Breakfast');
    }
    if (lunch) {
      frequency.push('Lunch');
    }
    if (dinner) {
      frequency.push('Dinner');
    }
  }

  const savereminder = (
    fDatePrimary,
    fDateSecondary,
    title,
    check1,
    noEndDate,
    reminderStatus,
    frequency,
    food,
    totalReminders,
    currentCount,
  ) => {
    if (
      moment(fDatePrimary).format('YYYY-MM-DD') >
      moment(fDateSecondary).format('YYYY-MM-DD')
    ) {
      CustomAlert({text1: 'Start Date should be less than End Date'});
      return;
    } else if (title.length === 0) {
      CustomAlert({text1: 'Please enter a valid Title'});
      return;
    } else if (timearray.length == 0) {
      CustomAlert({text1: 'Please enter atleat one Frequency'});
      return;
    } else if (food == null) {
      CustomAlert({text1: 'Please specify before or after food'});
      return;
    } else if (!check1 && !check2) {
      CustomAlert({text1: 'Please Select Days'});
      return;
    } else if (
      (breakfast === true && timearray[0] === undefined) ||
      (lunch === true && timearray[1] === undefined) ||
      (dinner === true && timearray[2] === undefined)
    ) {
      CustomAlert({text1: "Frequency can't be left as empty"});
      return;
    } else if (td_da > moment(fDateSecondary).format('YYYY-MM-DD')) {
      CustomAlert({text1: "End Date should be greater than Today's Date"});
      return;
    } else if (lunch === true) {
      let lunchTime = timearray[1];
      if (lunchTime.split(" ")[1] === 'AM') {
        CustomAlert({text1: 'Lunch time can only be from 12:00pm to 05:00pm'});
        return;
      } else {
        if (lunchTime[0] > 6) {
          CustomAlert({
            text1: 'Lunch time can only be from 12:00pm to 05:00pm',

          });
          return;
        
        } else {
          console.log(lunchTime[1])
          if (lunchTime[1] >=0 && lunchTime[1] <=1) {
            CustomAlert({
              text1: 'Lunch time can only be from 12:00pm to 05:00pm',
            });
            return;
          }
        }
      }
    }

    let time = '';
    let days = '';
    for (let i = 0; i < timearray.length; i++) {
      let mtime = timearray[i]?.split(' ')[0]?.split(':')[0];
      if (breakfast && i == 0) {
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      } else if (lunch && i == 1) {
        setFrequency([...frequency, 'Lunch']);
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      } else if (dinner && i == 2) {
        setFrequency([...frequency, 'Dinner']);
        if (parseInt(timearray[i].split(' ')[0].split(':')[1]) < 10) {
          mtime += ':0' + timearray[i].split(' ')[0].split(':')[1];
        } else {
          mtime += ':' + timearray[i].split(' ')[0].split(':')[1];
        }
        if (i === timearray.length - 1) {
          time += mtime + ' ' + timearray[i].split(' ')[1];
        } else {
          time += mtime + ' ' + timearray[i].split(' ')[1] + ',';
        }
      }
    }

    if (time === item.reminderTime) {
      CustomAlert({
        text1: 'Cannot update reminder with previous timings',
        text2: 'Kindly update atleast one time!!',
      });
      return;
    }
    loadstate(true);
    if (check2) {
      if (selecteddaysItems.length === 0) {
        CustomAlert({text1: 'Please select chosen days'});
        loadstate(false);
        return;
      }
      for (let i = 0; i < selecteddaysItems.length; i++) {
        if (i == selecteddaysItems.length - 1) {
          days += selecteddaysItems[i];
        } else {
          days += selecteddaysItems[i] + ',';
        }
      }
    } else if (check1) {
      days += 'Everyday';
      slecteddaysstate(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']);
    }

    frequencyHandler();
    const frequencyTemp = frequency.toString();

    let temporaryDate = fDateSecondary;

    if (endDate === 'No End Date') {
      setfDate('null');
    }

    let obj = route?.params?.data;

    obj.days = check1
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].toString()
      : days;
    obj.frequency = frequencyTemp;
    obj.endDate =
      temporaryDate !== 'No End Date'
        ? moment(temporaryDate).format('YYYY-MM-DD')
        : temporaryDate;
    obj.noEndDate = noEndDate;
    obj.reminderStatus = true;
    obj.reminderTime = time;
    obj.beforeAfter = food;
    obj.everyday = check1;
    obj.reminderTitle = title.trim();
    obj.startDate = moment(fDatePrimary).format('YYYY-MM-DD');
    obj.totalReminders = totalReminders;
    obj.currentCount = currentCount;
    obj.isSynced = false;

    let name = route.params.data.medicineName;

    if (reminderStatus === true) {
      PushNotification.getScheduledLocalNotifications(rn => {
        for (let i = 0; i < rn.length; i++) {
          if (rn[i].message.includes(`Take ${name}`)) {
            PushNotification.cancelLocalNotification({id: rn[i].id});
          }
        }
      });
    }
    let lengthSelectedDays = selecteddaysItems?.length;

    handlePushNotification(obj, check1, fDateSecondary, lengthSelectedDays);

    setfDate(temporaryDate);
    console.log(' reminder obj', obj);
    getMedicine()
      .then(data => {
        const temp = data;
        temp.map((ele, index) => {
          if (ele.userMedicineId === medId) {
            if (temp[index].reminderId !== null) {
              temp[index] = obj;
            } else {
              obj.reminderId = uuid.v4();
              temp[index] = obj;
            }
          }
        });

        AddMedicine(temp);
        loadstate(false);
      })
      .then(() => {
        SuccessToast({
          text1: 'Reminder Saved',
          position: 'bottom',
        });

        setTimeout(() => {
          navigation.pop();
        }, 1500);
      })
      .catch(err => {
        console.log(err);
        ErrorToast({
          text1: 'Something Went Wrong',
          text2: 'Try Again',
          position: 'bottom',
        });
      });
  };

  return (
    <View style={styles.scrollView}>
      <SubHeader title={'Add Reminder'} navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container1}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              pickerstate(true);
            }}
            style={styles.containerTouch}>
            <View style={styles.dateContainer}>
              <View style={styles.startDateContainer}>
                <Text style={styles.dateText}>Start Date</Text>
              </View>
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Text style={styles.dateText1}>
                    {todayDay[startDate.getDay()] +
                      ' ' +
                      startDate.getDate() +
                      ' ' +
                      months[startDate.getMonth()] +
                      ', ' +
                      startDate.getFullYear()}
                  </Text>
                </View>
                <View style={styles.arrow}>
                  <FontAwesomeIcon icon={faCaretDown} style={styles.downIcon} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation?.navigate('ReminderDuration', {
                date: startDate,
                endDate: getEndDate,
              });
            }}
            style={styles.containerTouch}>
            <View style={styles.dateContainer}>
              <View style={styles.endDateContainer}>
                <Text style={styles.dateText}>End Date</Text>
              </View>
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Text style={styles.dateText1}>
                    {fDateSecondary === 'No End Date'
                      ? 'No End Date'
                      : todayDay[endDate.getDay()] +
                        ' ' +
                        endDate.getDate() +
                        ' ' +
                        months[endDate.getMonth()] +
                        ', ' +
                        endDate.getFullYear()}
                  </Text>
                </View>
                <View style={styles.arrow}>
                  <FontAwesomeIcon icon={faCaretDown} style={styles.downIcon} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Divider />
          <DateTimePicker
            isVisible={picker}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={time_picker_mode}
            mode="time"
            onConfirm={handleConfirmfortime}
            onCancel={hideDatePickerfortime}
          />
          <Text style={styles.title}>Add Title</Text>
          <TextInput
            placeholder="Title for reminder"
            style={styles.titleText}
            mode="outlined"
            value={title}
            onChangeText={txt => {
              titlechange(txt);
            }}
            selectionColor={colorPallete.appColor}
            outlineColor={colorPallete.appColor}
            activeOutlineColor={colorPallete.appColor}
          />
          <Divider></Divider>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.title}>Frequency</Text>
              <CustomTooltip
                isVisible={showTip}
                setShowTip={setShowTip}
                placement="top"
                supportedOrientations={['portrait']}
                tooltipStyle={{}}
                contentStyle={{width: '100%', height: '100%'}}
                onClose={() => setShowTip(false)}
                content={
                  <View>
                    <Text
                      style={{fontSize: 16, color: 'grey', marginBottom: 4}}>
                      Add Frequency Timings as:
                    </Text>
                    <Text>Breakfast - 00:00 AM to 11:00 AM</Text>
                    <Text>Lunch - 12:00 PM to 6:00 PM</Text>
                    <Text>Dinner - 7:00 PM to 11:00 PM</Text>
                  </View>
                }>
                <TouchableOpacity
                  style={{paddingHorizontal: 8}}
                  activeOpacity={0.8}
                  onPress={() => setShowTip(true)}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    size={18}
                    color={colorPallete.mainColor}
                  />
                </TouchableOpacity>
              </CustomTooltip>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: breakfast ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPallete.mainColor,
                    backgroundColor: breakfast
                      ? colorPallete.mainColor
                      : colorPallete.greyColor,
                  }}
                  onPress={() => {
                    setBreakfastTouchable(!breakfastTouchable);
                    setBreakfast(!breakfast);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: breakfast ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Breakfast
                  </Text>
                </TouchableOpacity>
                {breakfastTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.frequencyTouchable}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(0);
                    }}>
                    <Text style={{fontSize: horizontalScale(14)}}>
                      {timearray[0] ? timearray[0] : 'Select Time'}
                    </Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: lunch ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPallete.mainColor,
                    backgroundColor: lunch
                      ? colorPallete.mainColor
                      : colorPallete.greyColor,
                  }}
                  onPress={() => {
                    setLunchTouchable(!lunchTouchable);
                    setLunch(!lunch);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: lunch ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Lunch
                  </Text>
                </TouchableOpacity>
                {lunchTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.frequencyTouchable}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(1);
                    }}>
                    <Text style={{fontSize: horizontalScale(14)}}>
                      {timearray[1] ? timearray[1] : 'Select Time'}
                    </Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{flexDirection: 'column', width: '30%'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    borderRadius: dinner ? 3 : 0,
                    alignItems: 'center',
                    borderColor: colorPallete.mainColor,
                    backgroundColor: dinner
                      ? colorPallete.mainColor
                      : colorPallete.greyColor,
                  }}
                  onPress={() => {
                    setDinnerTouchable(!dinnerTouchable);
                    setDinner(!dinner);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: dinner ? 'white' : 'black',
                      padding: 6,
                    }}>
                    Dinner
                  </Text>
                </TouchableOpacity>
                {dinnerTouchable ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.frequencyTouchable}
                    onPress={() => {
                      time_picker_mode_state(true);
                      setCurrentIndex(2);
                    }}>
                    <Text style={{fontSize: horizontalScale(14)}}>
                      {timearray[2] ? timearray[2] : 'Select Time'}
                    </Text>
                    <View style={styles.arrow}>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.medicineContainer}>
            <View style={styles.takeMedicine}>
              <Text style={styles.takeMedicineText}>Take Medicine</Text>
            </View>
            <View style={styles.touchableButton}>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.buttonStyles,
                  {
                    backgroundColor: foodBefore
                      ? colorPallete.mainColor
                      : 'white',
                  },
                ]}
                onPress={() => {
                  setFood('Before');
                  setFoodBefore(!foodBefore);
                  setFoodAfter(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: foodBefore ? 'white' : 'black',
                    textAlign: 'center',
                  }}>
                  Before food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.buttonStyles,
                  {
                    backgroundColor: foodAfter
                      ? colorPallete.mainColor
                      : 'white',
                  },
                ]}
                onPress={() => {
                  setFood('After');
                  setFoodAfter(!foodAfter);
                  setFoodBefore(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: foodAfter ? 'white' : 'black',
                    textAlign: 'center',
                  }}
                  numberOfLines={2}
                  textBreakStrategy="highQuality">
                  After food
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Divider />

          <View style={{marginBottom: 10}}>
            <Text style={styles.title}>Select Days</Text>

            <CheckBox
              style={styles.days}
              onClick={() => {
                setCheck1(!check1);
                setCheck2(false);
              }}
              isChecked={check1}
              checkBoxColor={colorPallete.appColor}
              leftText={'Everyday'}
              leftTextStyle={{fontSize: 16, color: 'gray'}}
            />
            <CheckBox
              style={styles.days}
              onClick={() => {
                setCheck2(!check2);
                setCheck1(false);
              }}
              isChecked={check2}
              checkBoxColor={colorPallete.appColor}
              leftText={'Selected days'}
              leftTextStyle={{fontSize: 16, color: 'gray'}}
            />
            {check2 && (
              <SectionedMultiSelect
                hideSearch={true}
                IconRenderer={Icon}
                items={day_data}
                uniqueKey="id"
                subKey="children"
                selectText="Choose days"
                showDropDowns={true}
                expandDropDowns={true}
                icons={{
                  arrowUp: {
                    size: 20,
                    name: 'keyboard-arrow-up',
                  },
                  arrowDown: {
                    name: 'keyboard-arrow-down',
                    size: 22,
                  },
                  check: {
                    name: 'check',
                    size: 22,
                  },
                  close: {
                    name: 'close',
                    size: 16,
                  },
                }}
                styles={{
                  listContainer: {height: 300, backgroundColor: 'red'},
                  container: {maxHeight: 370, marginTop: 200, padding: 20},
                  backdrop: {height: 400},
                  modalWrapper: {height: 400},
                  button: {
                    backgroundColor: colorPallete.appColor,
                  },
                  cancelButton: {
                    backgroundColor: 'white',
                  },
                  chipContainer: {
                    backgroundColor: colorPallete.appColor,
                  },
                }}
                colors={{
                  chipColor: 'white',
                }}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelecteddaysItemsChange}
                selectedItems={selecteddaysItems}></SectionedMultiSelect>
            )}
          </View>
          <Divider />
          <Button
            loading={load}
            title="Save reminder"
            onPress={() => {
              savereminder(
                fDatePrimary,
                fDateSecondary,
                title,
                check1,
                noEndDate,
                reminderStatus,
                frequency,
                food,
                totalReminders,
                currentCount,
              );
            }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </ScrollView>
      <Toast visibilityTime={1000} />
    </View>
  );
};

export default Reminder;
