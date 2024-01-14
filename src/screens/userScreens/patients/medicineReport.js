import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {PermissionsAndroid} from 'react-native';
import Downloadpdf from '../../../components/organisms/downloadPdf';
import {Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  getPatientHistoryClear,
  getPatientHistoryRequest,
} from '../../../redux/action/patients/getPatientHistoryAction';
import Reminder from './medicineReminders';
import {weeks, months, month} from '../../../constants/constants';
import styles from '../../../styles/patientStyles/medicineReportStyles';
import LottieView from 'lottie-react-native';
import HistoryDetail from './historyDetail';
import CustomModal from '../../../components/molecules/customModal';
import AnimatedProgessCircle from '../../../components/atoms/AnimatedProgressCircle';
import Loader from '../../../components/atoms/loader';
import {CustomAlert} from '../../../components/atoms/customAlert';
import moment from 'moment';
import {serverErrors} from '../../../constants/statusCodes';
import ErrorBoundary from '../../otherScreens/errorBoundary';

let detailData = {};

const MedicineReport = ({navigation, route}) => {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const {startDate, days, endDate, reminderId} = item;
  const res = useSelector(state => state.getPatientHistory?.data);
  const errorState = useSelector(state => state.getPatientHistory?.error);
  const [historyData, setHistoryData] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDetail, showDetailState] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(
    reminderId !== null ? true : false,
  );
  const [scrollEnd, setScrollEnd] = useState(true);
  let td_da = moment().format('YYYY-MM-DD');

  useEffect(() => {
    if (reminderId === null) {
      showAlert();
    } else if (startDate > td_da) {
      showAlert();
    }
  }, [reminderId]);

  async function setData() {
    setHistoryData([...historyData, ...res]);
    overallPercentage([...historyData, ...res]);
    showAllDates();
    setIsLoading(false);
    dispatch(getPatientHistoryClear());
  }

  useEffect(() => {
    if (res !== null && res.length !== 0) {
      setData();
    } else setIsLoading(false);
  }, [isLoading, res]);

  useFocusEffect(
    React.useCallback(() => {
      let med = item?.userMedicineId;
      dispatch(getPatientHistoryRequest({med, pageNo}));
      return () => {
        true;
      };
    }, []),
  );

  const showAlert = () => {
    CustomAlert({
      text1: 'No Report Present',
      onPress: () => {
        navigation.pop();
      },
    });
  };

  function overallPercentage(data) {
    let cc = 0;
    let tr = 0;
    if (data.length !== 0) {
      data.map(item => {
        tr += item.time.split(',').length;
        let temp = item.taken.split(',');
        temp.map(i => {
          if (i !== '') {
            cc += 1;
          }
        });
      });

      setPercentage(Math.floor((cc / tr) * 100));
    } else {
      setPercentage(0);
    }
  }

  const showAllDates = () => {
    let alldates = [];
    let msd = new Date(startDate),
      mld = endDate === 'No End Date' ? new Date() : new Date(endDate);
    let daysSet = new Set(days?.split(','));
    let todayDate = new Date();

    while (msd <= mld && msd <= todayDate) {
      if (daysSet.has(weeks[msd.getDay()])) {
        let currentDate = new Date(msd);
        const dateObj = {day: '', date: '', month: 0, color: '', year: 0};
        dateObj.day = weeks[currentDate.getDay()].slice(0, 3);
        dateObj.date = currentDate.getDate().toString();
        dateObj.month = months[currentDate.getMonth()];
        dateObj.color =
          currentDate < todayDate
            ? colorPallete.mainColor
            : colorPallete.lightWhite;
        dateObj.year = currentDate.getFullYear();
        alldates.push(dateObj);
      }
      msd.setDate(msd.getDate() + 1);
    }
    setAllDates(alldates);
  };

  const downloadPdf = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    setModalVisible(true);
    const downloadResp = await Downloadpdf(item?.userMedicineId);
    setModalVisible(false);
    if (downloadResp !== 'err') {
      ToastAndroid.show('Downloaded successfully', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Error while downloading', ToastAndroid.LONG);
    }
  };

  const showDetailfun = sDate => {
    detailData = historyData.find(el => el.date === sDate);
    if (detailData === undefined) {
      ToastAndroid.show('Not available', ToastAndroid.LONG);
      return;
    }
    showDetailState(true);
    setModalVisible(true);
  };

  const onEnd = () => {
    let a = pageNo + 1;
    if (historyData?.length % 5 === 0 && a !== 0) {
      let med = item?.userMedicineId;
      let pageNo = a;
      dispatch(getPatientHistoryRequest({med, pageNo}));
      setPageNo(a);
    }
  };

  return (
    <View style={styles.mainCont}>
      <SubHeader
        title={'Medicine Report'}
        download={downloadPdf}
        navigation={navigation}
        errorState={errorState}
      />
      <CustomModal
        onRequestClose={() => setModalVisible(false)}
        type="fade"
        modalView={
          showDetail ? (
            <HistoryDetail
              data={detailData}
              onPress={() => {
                showDetailState(false);
                setModalVisible(false);
              }}
            />
          ) : (
            <LottieView
              style={styles.lottie}
              speed={0.8}
              source={require('../../../assets/animation/generatepdf.json')}
              autoPlay
              loop
            />
          )
        }
        modalVisible={modalVisible}
        customStyles={styles.detailView}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorState === serverErrors.SERVER_ERROR ? (
            <ErrorBoundary />
          ) : (
            <>
              <View style={styles.animatedCircle}>
                <AnimatedProgessCircle
                  radius={58}
                  strokeWidth={12}
                  percentage={percentage}
                  outerCircleColor={'#CFF5E7'}
                  innerCircleColor={'grey'}
                />
                <Text style={styles.performance} numberOfLines={1}>
                  {item?.medicineName}
                </Text>
              </View>
              <View style={styles.bottomSheet}>
                <View style={styles.mainView}>
                  <Text style={styles.heading} numberOfLines={1}>
                    Scheduled Dates for {item?.medicineName}
                  </Text>
                  <ScrollView
                    keyExtractor={index => index.toString()}
                    horizontal={true}
                    contentContainerStyle={styles.scrollView}
                    showsHorizontalScrollIndicator={false}>
                    {allDates.map(mCurrentDate => {
                      return (
                        <View style={styles.scrollViewCont}>
                          <Text style={styles.scrollViewText}>
                            {mCurrentDate.day}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              showDetailfun(
                                mCurrentDate.year +
                                  '-' +
                                  month[mCurrentDate.month] +
                                  '-' +
                                  (mCurrentDate.date < 10
                                    ? '0' + mCurrentDate.date
                                    : mCurrentDate.date),
                              );
                            }}>
                            <View
                              style={{
                                marginHorizontal: 10,
                                padding: 12,
                                width: 70,
                                alignItems: 'center',
                                borderRadius: 35,
                                backgroundColor: mCurrentDate.color,
                              }}>
                              <View style={styles.scrollViewDate}>
                                <Text style={{color: 'black'}}>
                                  {mCurrentDate.date}
                                </Text>
                              </View>
                              <Text
                                style={{color: 'white', paddingVertical: 2}}>
                                {mCurrentDate.month}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
                <Divider style={styles.divider1} />
                <Text style={styles.medicineHistory}>Medicine History</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={historyData}
                  renderItem={({item, index}) => {
                    return <Reminder item={item} index={index} />;
                  }}
                  onEndReachedThreshold={0.01}
                  onMomentumScrollBegin={() => setScrollEnd(false)}
                  onEndReached={({distanceFromEnd}) => {
                    if (!scrollEnd) {
                      !errorState ? onEnd() : null;
                      setScrollEnd(true);
                    }
                  }}
                  keyExtractor={item => item.historyId}
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default MedicineReport;
