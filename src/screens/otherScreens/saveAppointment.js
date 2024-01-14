import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SubHeader from '../../components/molecules/headers/subHeader';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import {appointmentValidationSchema} from '../../constants/validations';
import InputField from '../../components/atoms/inputField';
import CustomButton from '../../components/atoms/customButton';
import Toast from 'react-native-toast-message';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {hour} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {AddMedicine, getMedicine} from '../../utils/storage';
import uuid from 'react-native-uuid';
import Notifications from '../../pushNotification/pushNotifications';
import {colorPallete} from '../../components/atoms/colorPalette';
import {SuccessToast} from '../../components/atoms/customToast';
import {CustomAlert} from '../../components/atoms/customAlert';
import Analytics from '../../components/organisms/analytics';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AppointmentReminders = ({navigation, route}) => {
  //React useState hooks
  const [dateOpen, setDateOpen] = useState(false);
  const [saveTimeOpen, setSaveTimeOpen] = useState(false);
  const [flag,setFlag]=useState(0)
  let doctorNameList = route.params.doctorNameList;

  const showAlert = () => {
    CustomAlert({text1: 'Please add valid time'});
  };

  //Pushing scheduled notificatons
  const handlePushNotification = (obj, reminderTime, time) => {
    console.log(time,"time");
    let dateTime = moment(obj.localDate + ' ' + reminderTime);
    Notifications.schduleNotification2(dateTime._d, time);
  };

  const helperFunction = (time1, time2, reminderTime, obj, prescriptionId) => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        updatedList.map((item, index) => {
          //storing the appointment
          if (item.prescriptionId === prescriptionId) {
            updatedList[index].doctorAppointmentList.push(obj);
            updatedList[index].isSynced = false;
          }
        });

        //pushing the updatedList
        AddMedicine(updatedList);
        SuccessToast({
          text1: 'Appointment Saved Successfully',
          position: 'bottom',
        });
      }

      //scheduling the push notification
      reminderTime > time2
        ? handlePushNotification(obj, reminderTime, obj.localTime)
        : null;
      handlePushNotification(obj, time1, obj.localTime);
      setTimeout(() => {
        navigation.pop();
      }, 2000);
    });
  };

  //Saving Appointment
  const saveAppointment = values => {
    let prescriptionId = values.doctorName;
    let appointmentId = uuid.v4();
    let obj = {
      notes: values.notes.trim(),
      localDate: values.date,
      localTime: values.time,
      appointmentId: appointmentId,
      flag:flag
    };

    let d = new Date();
    let currentTime = d.getHours() + ':' + d.getMinutes();
    let currentDate = moment().format('YYYY-MM-DD');

    let time1 = moment(obj.localTime, ['h:mm A']).format('HH:mm');
    let time2 = moment(currentTime, ['h:mm A']).format('HH:mm');

    let hour =
      parseInt(time1.split(':')[0]) === 0
        ? 23
        : parseInt(time1.split(':')[0]) - 1;

    let reminderTime = hour + ':' + time1.split(':')[1];

    //comparing currentDate and scheduled date
    if (currentDate === obj.localDate) {
      //if both the dates matched then checking timing and if new time
      //is greater than previous time then saving appointment
      time1 > time2
        ? helperFunction(time1, time2, reminderTime, obj, prescriptionId)
        : //scheduled time is less than currentTime
          showAlert();
    } else {
      //if scheduled date is greater than previously selected date then
      helperFunction(time1, time2, reminderTime, obj, prescriptionId);
    }
  };

  return (
    <View style={styles.mainView}>
      <SubHeader title={'Save Appointment'} navigation={navigation} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              doctorName: doctorNameList[0].prescriptionId,
              notes: '',
              date: '',
              time: '',
            }}
            validationSchema={appointmentValidationSchema}
            onSubmit={values => {
              Analytics('save_appointment', 'save_appointment_button');
              saveAppointment(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.formBody}>
                <View style={styles.picker}>
                  <View style={styles.text1}>
                    <Text style={styles.docName}>Doctor Name</Text>
                    <Picker
                      style={styles.pickerBody}
                      dropdownIconColor={1}
                      mode="dropdown"
                      selectedValue={values.doctorName}
                      onValueChange={itemValue => {
                        setFieldValue('doctorName', itemValue);
                      }}>
                      {doctorNameList?.map(item => {
                        return (
                          <Picker.Item
                            label={item.doctorName}
                            value={item.prescriptionId}
                            key={item.prescriptionId}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  {errors.doctorName && touched.doctorName && (
                    <Text style={styles.validation1}>{errors.doctorName}</Text>
                  )}
                </View>

                {/* Note */}
                <View style={styles.notes}>
                  <InputField
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    label="Notes"
                    mode="outlined"
                    outlineColor="lightgrey"
                    text="notes"
                    activeOutlineColor={colorPallete.mainColor}
                    value={values.notes}
                    styles={styles.field}
                    multiline={true}
                    selectTextOnFocus={true}
                  />
                  {errors.notes && touched.notes && (
                    <Text style={styles.validation1}>{errors.notes}</Text>
                  )}
                </View>

                {/* Date */}
                <View style={[styles.container1, {marginBottom: 16}]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setDateOpen(true);
                    }}
                    style={styles.containerTouch}>
                    <View style={styles.dateContainer}>
                      <View style={styles.heading}>
                        <Text style={styles.dateText}>Date</Text>
                      </View>
                      <View style={styles.dateView}>
                        <View style={styles.dateSubView}>
                          <Text style={styles.dateText1}>{values.date}</Text>
                        </View>
                      </View>
                      <View style={styles.arrow}>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={styles.downIcon}
                          size={14}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {errors.date && touched.date && (
                    <Text style={styles.validation1}>{errors.date}</Text>
                  )}
                </View>

                <DateTimePicker
                  minimumDate={new Date()}
                  isVisible={dateOpen}
                  mode="date"
                  onConfirm={date => {
                    setFieldValue('date', moment(date).format('YYYY-MM-DD'));
                    setDateOpen(false);
                  }}
                  onCancel={() => setDateOpen(false)}
                />

                {/* Time */}
                <View style={[styles.container1, {marginBottom: 16}]}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setSaveTimeOpen(true);
                    }}
                    style={styles.containerTouch}>
                    <View style={styles.dateContainer}>
                      <View style={styles.heading}>
                        <Text style={styles.dateText}>Time</Text>
                      </View>
                      <View style={styles.dateView}>
                        <View style={styles.dateSubView}>
                          <Text style={styles.dateText1}>{values.time}</Text>
                        </View>
                      </View>
                      <View style={styles.arrow}>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={styles.downIcon}
                          size={14}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {errors.time && touched.time && (
                    <Text style={styles.validation1}>{errors.time}</Text>
                  )}
                </View>
                <DateTimePickerModal
                  isVisible={saveTimeOpen}
                  mode="time"
                  onConfirm={date => {
                    let minutes =
                      date.getMinutes() < 10
                        ? '0' + date.getMinutes()
                        : date.getMinutes();

                    let newTime =
                      date.getHours() > 11
                        ? hour[date.getHours()] + ':' + minutes + ' ' + 'PM'
                        : date.getHours() + ':' + minutes + ' ' + 'AM';

                    setFieldValue('time', newTime);
                    setSaveTimeOpen(false);
                  }}
                  onCancel={() => setSaveTimeOpen(false)}
                />
                <CustomButton
                  title={'Save'}
                  handleSubmit={handleSubmit}
                  contStyles={styles.contStyles}
                  btnStyles={styles.btnStyles}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={1500} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: colorPallete.mainColor},
  container1: {
    marginBottom: 15,
    width: '92%',
    padding: 3,
  },
  text1: {
    width: '88%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  validation1: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 9,
    marginTop: 1,
  },
  doctorVal: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 1,
  },
  containerTouch: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: 'grey',
  },
  dateText1: {
    fontSize: 17,
    marginLeft: 8,
    color: 'black',
  },
  arrow: {
    justifyContent: 'center',
    width: '10%',
  },
  keyboardView: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  formBody: {alignItems: 'center', flex: 1, marginTop: 19},
  picker: {marginBottom: 16},
  docName: {
    fontSize: 17,
    color: colorPallete.colorTabsOutline,
    fontWeight: '600',
  },
  pickerBody: {width: '58%', color: 'black'},
  notes: {
    width: '90%',
    marginBottom: 16,
  },
  field: {height: 100, backgroundColor: 'white'},
  heading: {justifyContent: 'flex-start', width: '35%'},
  dateView: {
    width: '51%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSubView: {
    width: '100%',
    alignItems: 'center',
  },
  contStyles: {marginVertical: 18, width: '25%'},
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AppointmentReminders;
