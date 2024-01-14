import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import {styles} from '../../../styles/reportScreenStyles/reportScreenStyles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DayComponent from './dayComponent';
import HistoryDetail from '../patients/historyDetail';
import AnimatedProgressCircle from '../../../components/atoms/AnimatedProgressCircle';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {colorPallete} from '../../../components/atoms/colorPalette';
import ProgressCircle from 'react-native-progress-circle';
import {getMedicine} from '../../../utils/storage';
import {months} from '../../../constants/constants';
import Downloadpdf from '../../../components/organisms/downloadPdf';
import Loader from '../../../components/atoms/loader';
import {RefreshControl} from 'react-native-gesture-handler';
import {CustomAlert} from '../../../components/atoms/customAlert';
import moment from 'moment';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

const Report = ({navigation}) => {
  const [medicineId, setMedicineId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [getUserMedicine, setGetUserMedicine] = useState([]);
  const [historyData, setHistoryData] = useState({});
  const [historyListData, setHistoryListData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [dataMap, setDataMap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    let arr = [];
    getMedicine()
      .then(data => {
        if (data !== null && data.length !== 0) {
          data.map(ele => {
            if (ele.flag === false) arr.push(ele);
          });
          setGetUserMedicine(arr);
        } else {
          setGetUserMedicine([]);
          showAlert();
        }
      })
      .then(() => {
        if (getUserMedicine.length !== 0 && medicineId !== null) {
          getHistory(medicineId);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    setRefresh(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [medicineId]),
  );

  let startDate = moment().format('YYYY-MM-DD');

  const showAlert = () => {
    Alert.alert('Add Medicine First', 'Click Ok to proceed', [
      {
        text: 'Ok',
        onPress: () => {
          navigation.navigate('AddMedicineStack', {
            screen: 'AddMedicine',
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ]);
  };

  const downloadPdf = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    let reminderId = null;
    getMedicine()
      .then(data => {
        if (data !== null && data.length !== 0) {
          data.map(item => {
            if (
              item.userMedicineId === medicineId &&
              item.reminderId !== null
            ) {
              reminderId = item.reminderId;
            }
          });
        }
      })
      .then(async () => {
        console.log(reminderId,"rid")
        if (reminderId !== null) {
          const downloadResp = await Downloadpdf(medicineId);
          console.log(downloadResp,"download")
          if (downloadResp !== 'err') {
            ToastAndroid.show('Downloaded successfully', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('Error while downloading', ToastAndroid.LONG);
          }
        } else {
          CustomAlert({
            text1: 'No reminder present',
            text2: 'Please add reminder to download report',
          });
        }
      })
      .catch(err => console.log(err));
  };

  function getHistory(medicineId) {
    let histories = [];
    getUserMedicine.forEach(data => {
      if (data.userMedicineId === medicineId && data.historyList.length !== 0) {
        data.historyList.map(i => {
          let his = {};
          his.historyId = i.historyId;
          his.taken = i.taken;
          his.notTaken = i.notTaken;
          his.date = i.date;
          his.time = i.time;
          histories.push(his);
          dateSelector(histories);
          setHistoryListData(histories);
          overallPercentage(data);
        });
      } else if (
        data.userMedicineId == medicineId &&
        data.historyList.length === 0
      ) {
        setHistoryListData([]);
        dateSelector([]);
        overallPercentage(data);
      }
    });
  }

  const dayPercentageCalculator = (Taken, time) => {
    const tt = [];
    const t = [];
    if (time !== '') {
      time.split(',').map(i => {
        tt.push(i);
      });
    }
    if (Taken !== '') {
      Taken.split(',').map(i => {
        t.push(i);
      });
    }
    let takenLength = 0;
    let totalLength = 0;
    tt.map(i => {
      if (i !== '') {
        totalLength += 1;
      }
    });
    t.map(i => {
      if (i !== '') {
        takenLength += 1;
      }
    });
    return Math.floor((takenLength / totalLength) * 100);
  };

  function overallPercentage(data) {
    let cc = 0;
    let tr = 0;
    // console.log('data', data);
    if (data.historyList.length !== 0) {
      data.historyList.map(item => {
        tr += item.time.split(',').length;
        let temp = item.taken.split(',');
        temp.map(i => {
          if (i !== '') {
            cc += 1;
          }
        });
      });
      // console.log('tt cc', cc , tr);
      setPercentage(Math.floor((cc / tr) * 100));
    } else {
      setPercentage(0);
    }
  }

  const dateSelector = history => {
    var data = [];
    if (history.length !== 0) {
      history.forEach(item => {
        let percentage = dayPercentageCalculator(item.taken, item.time);
        data.push({date: item.date, percentage: percentage});
      });
    }
    setDataMap(data);
  };

  const ModalOpen = () => {
    setModalVisible(true);
  };

  const alertFunction = () => {
    CustomAlert({text1: 'You have no adhrence of this date'});
  };

  const getHistorydata = date => {
    const a = b => b.date == date.dateString;
    const historyIndex = historyListData.findIndex(a);
    setHistoryData(historyListData[historyIndex]);
  };

  const dayComponent = (date, state) => {
    const a = b => b.date == date.dateString;
    const index = dataMap.findIndex(a);
    return (
      <>
        {dataMap.some(a) ? (
          <DayComponent
            date={date}
            state={state}
            selectedDate={selectedDate}
            initialDate={'2022-11-21'}
            setSelectedDate={setSelectedDate}
            percentage={dataMap[index].percentage}
            setModalVisible={ModalOpen}
            history={getHistorydata}
          />
        ) : (
          <TouchableOpacity
            style={{}}
            activeOpacity={1}
            onPress={() => alertFunction()}>
            <ProgressCircle
              percent={0}
              radius={15}
              borderWidth={3}
              color={'grey'}
              shadowColor={'lightgrey'}
              bgColor={colorPallete.backgroundColor}>
              <Text style={{fontSize: 16, color: colorPallete.black}}>
                {date.day}
              </Text>
            </ProgressCircle>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const onRefresh = () => {
    setIsLoading(true);
    setRefresh(true);
    fetchData();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1500);
  };

  return (
    <>
      <View style={styles.container} />
      <View style={styles.report}>
        <MainHeader
          title={'Report'}
          navigation={navigation}
          download={downloadPdf}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBox}>
            <HistoryDetail
              data={historyData}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
        <View style={{paddingHorizontal: 12, paddingTop: 10}}>
          <View style={styles.picker}>
            <Picker
              style={{color: 'black'}}
              mode="dialog"
              selectedValue={medicineId}
              onValueChange={data => {
                setIsLoading(true);
                setMedicineId(data);
              }}>
              {getUserMedicine?.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.medicineName}
                    value={item.userMedicineId}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => onRefresh()}
                  colors={[colorPallete.mainColor]}
                />
              }>
              <View style={styles.reportContainer}>
                <View style={styles.analytics}>
                  <View style={styles.container1Text}>
                    <Text style={styles.font}>Overall Percentage</Text>
                    <Text style={styles.fontSmall}>
                      This percentage shows your overall adherence rate.
                    </Text>
                  </View>
                  <View style={styles.progressView}>
                    <AnimatedProgressCircle
                      radius={57}
                      percentage={percentage}
                      strokeWidth={12}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.reportHeading}>
                <Text style={styles.reportText}>Your Report</Text>
              </View>
              <View style={styles.calendarView}>
                <Calendar
                  style={styles.calendar}
                  theme={styles.theme}
                  initialDate={startDate}
                  minDate={'2012-05-10'}
                  monthFormat={'yyyy MM'}
                  hideArrows={false}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  firstDay={1}
                  hideDayNames={false}
                  onPressArrowLeft={subtractMonth => subtractMonth()}
                  onPressArrowRight={addMonth => addMonth()}
                  disableAllTouchEventsForDisabledDays={true}
                  renderHeader={date => {
                    return (
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: 'grey',
                        }}>
                        {moment(date)._d.getDate() +
                          ' ' +
                          months[date.getMonth()] +
                          ' ,' +
                          ' ' +
                          date.getFullYear()}
                      </Text>
                    );
                  }}
                  enableSwipeMonths={true}
                  dayComponent={({date, state}) => dayComponent(date, state)}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default Report;
