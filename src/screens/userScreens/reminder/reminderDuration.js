import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import CheckBox from 'react-native-check-box';
import {deviceWidth} from '../../../components/atoms/constant';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {months, todayDay} from './pushNotification/timeData';
import CustomButton from '../../../components/atoms/customButton';
import CircleCheckBox from 'react-native-circle-checkbox';
import {CustomAlert} from '../../../components/atoms/customAlert';

const ReminderDuration = ({route, navigation}) => {
  const [endDate, endDateState] = useState(new Date());
  let temporaryDate = new Date();
  temporaryDate.setDate(temporaryDate.getDate() + 1);
  let startDate = route.params.date;
  const [multiSliderValue, setMultiSliderValue] = useState([0]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [picker, pickerstate] = useState(false);
  const [days, setDays] = useState(0);

  const hideDatePicker = () => {
    pickerstate(false);
  };

  const handleConfirm = date => {
    pickerstate(false);
    endDateState(date);
  };
  const multiSliderValuesChange = values => {
    setDays(values);
    let curr_date = new Date();
    curr_date.setDate(startDate.getDate() + values[0]);
    endDateState(curr_date);
    setMultiSliderValue(values);
  };

  const handleEndDate = () => {
    endDateState(startDate);
  };
  return (
    <View style={styles.container}>
      <SubHeader navigation={navigation} title={'Duration'} />
      <View style={{marginHorizontal: 20}}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Start Date</Text>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
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
        </View>
        <Divider></Divider>
        <View style={{paddingVertical: 10, paddingHorizontal: 6}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>No End Date </Text>
            </View>
            <View style={styles.checkView}>
              <CircleCheckBox
                checked={check1}
                onToggle={() => {
                  setCheck1(!check1);
                  setCheck2(false);
                  setCheck3(false);
                  handleEndDate();
                }}
                styleCheckboxContainer={styles.days}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>Untill This Date </Text>
            </View>
            <View style={styles.checkView}>
              <CircleCheckBox
                checked={check2}
                onToggle={() => {
                  setCheck2(!check2);
                  setCheck3(false);
                  setCheck1(false);
                  pickerstate(true);
                }}
                styleCheckboxContainer={styles.days}
              />
              {/* <CheckBox
                style={styles.days}
                onClick={() => {
                  setCheck2(!check2);
                  setCheck3(false);
                  setCheck1(false);
                  pickerstate(true);
                }}
                isChecked={check2}
                checkBoxColor={colorPallete.appColor}
              /> */}
            </View>
          </View>
          {check2 && (
            <View>
              <DateTimePicker
                isVisible={picker}
                mode="date"
                minimumDate={temporaryDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.textView}>
              <Text style={styles.itemText}>For X No. of Days - {days}</Text>
            </View>
            <View style={styles.checkView}>
              <CircleCheckBox
                checked={check3}
                onToggle={() => {
                  setCheck3(!check3);
                  setCheck2(false);
                  setCheck1(false);
                }}
                styleCheckboxContainer={styles.days}
              />
            </View>
          </View>
          {check3 && (
            <MultiSlider
              values={[multiSliderValue[0]]}
              sliderLength={deviceWidth / 1.2}
              onValuesChange={multiSliderValuesChange}
              max={100}
              step={1}
              customMarker={() => (
                <FontAwesomeIcon
                  color={colorPallete.appColor}
                  size={20}
                  icon={faCircle}
                />
              )}
            />
          )}
        </View>
        <Divider></Divider>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 15,
          }}>
          <View>
            <Text style={styles.dateText}>End Date </Text>
          </View>
          <Text style={styles.dateText1}>
            {check1
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

        <CustomButton
          title={'Save'}
          handleSubmit={() => {
            if (!check1 && !check2 && !check3) {
              CustomAlert({text1: 'Please set the end date'});
              return;
            }
            route.params.endDate(endDate);
            navigation.pop();
          }}
          contStyles={{
            marginVertical: 50,
            alignSelf: 'center',
            width: '30%',
          }}
          btnStyles={{
            backgroundColor: colorPallete.mainColor,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

export default ReminderDuration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPallete.basicColor,
  },
  dateContainer: {width: '100%', paddingVertical: 20},
  dateText: {fontSize: 20, fontWeight: '600', color: colorPallete.black},
  dateText1: {
    fontSize: 16,
    color: 'black',
  },
  days: {paddingVertical: 8},
  textView: {
    width: '60%',
    alignItems: 'flex-start',
  },
  itemText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'gray',
  },
  checkView: {
    width: '40%',
    alignItems: 'center',
  },
  line: {height: 1, backgroundColor: 'red', width: '50%'},
});
