import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import Reminders from './homeReminders';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import AnimatedProgressCircle from '../../components/atoms/AnimatedProgressCircle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  myCaretakerClear,
  myCaretakerRequest,
} from '../../redux/action/caretaker/myCaretakerAction';
import {verticalScale} from '../../components/atoms/constant';
import {AddMedicine, getMedicine, getPercentageDetails, getPrescription} from '../../utils/storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/atoms/loader';
import {CustomAlert} from '../../components/atoms/customAlert';
import syncMedicine from '../../sync/syncMedicine';
import fetchUserMedicine from '../../sync/fetchUserMedicine';
import {loadMedicineList} from '../../redux/action/userMedicine/medicineListAction';
import {getAppointmentListRequest} from '../../redux/action/userMedicine/getAppointmentListAction';
import {getAllMedicineHistoryRequest} from '../../redux/action/userMedicine/getAllMedicineHistoryAction';
import MedicineHistory from './medicineHistory';
import getPercentage from './getPercentage';
import {colorPallete} from '../../components/atoms/colorPalette';
import CustomTooltip from '../../components/atoms/customTooltip';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [medData, setMedData] = useState([]);
  console.log(medData,"reminder")
  const [isLoading, setIsLoading] = useState(true);
  const [myCaretakers, setMyCaretakers] = useState([]);
  const [showTip, setShowTip] = useState(false);

  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  const res = useSelector(state => state.myCaretaker?.data);
  const userMedicine = useSelector(state => state.medicineList?.data);
  console.log(userMedicine,"usm")
  
  const appointmentList = useSelector(state => state.appointmentList?.data);
  console.log(appointmentList,"aplist")
  const historyList = useSelector(state => state.allMedicineHistory?.data);
  console.log(historyList,"history list")
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {text: 'YES', onPress: () => BackHandler.exitApp()},
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  // useEffect(() => {
  //   if (
  //     userMedicine !== null &&
  //     userMedicine?.length !== 0 &&
  //     historyList !== null &&
  //     appointmentList != null
  //   ) {
  //     fetchUserMedicine(userMedicine, appointmentList, historyList);
  //   }
  // }, [userMedicine, historyList, appointmentList]);

  useEffect(()=>{
  fetchUserMedicine(userMedicine,appointmentList,historyList)

  },[userMedicine, historyList, appointmentList])

  const firstCall=()=>{
    if(userMedicine!==null)
    {
      fetchUserMedicine(userMedicine,appointmentList,historyList)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getData().then(() => {
        if (connected && load) {
          syncMedicine(dispatch);
        }
      });
    }, [connected, load]),
  );

  useEffect(() => {
    if (connected && load) {
      if (medData.length !== 0) {
        dispatch(myCaretakerRequest(0));
      }
      dispatch(loadMedicineList());
      dispatch(getAllMedicineHistoryRequest());
      dispatch(getAppointmentListRequest());
    }
  }, [connected, load]);

  useEffect(() => {
    if (res !== null && res.length !== 0) {
      setMyCaretakers(res);
      dispatch(myCaretakerClear());
    }
    return () => false;
  }, [res]);

  const getData = async () => {
    getMedicine().then(data => {
      console.log(data,"homescreen");
      if (data !== null && data.length !== 0) {
        setMedData(data);
        //for Calculating Overall Percentage
        let p = getPercentage(data);
        setPercentage(p);
      } else {
        setMedData([]);
        setPercentage(0);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    //for Calculating today's Reminder
    medData.length !== 0 ? MedicineHistory(medData, dispatch) : null;
  }, [medData]);

  //for Calculating Overall Percentage on particular date
  function getDate(data) {
    getPercentageDetails().then(item => {
      console.log(item, 'itemm');
      if (item !== null && item.length !== 0) {
        let temp = item;
        const index = temp.findIndex(a => a.date == data);
        console.log(temp[index].percentage, 'temp.percentage');
        if (index >= 0) {
          setPercentage(temp[index].percentage);
        } else {
          setPercentage(0);
        }
        return;
      }
    });
  }

  const showAlert = () => {
    if (connected && load) {
      Alert.alert(
        'Would you like to send a snap to caretaker',
        'Click Ok to send',
        [
          {
            text: 'Ok',
            onPress: () => {
              if (myCaretakers.length === 0) {
                CustomAlert({text1: 'Need to add caretaker first'});
              } else {
                navigation.navigate('HomeStack', {
                  screen: 'SendSnapToCaretaker',
                });
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              {
              }
            },
          },
        ],
      );
    }
  };

  const checkdata=()=>{
    getPrescription().then(data=>{
      console.log(data,"data in local ")
    })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.background} />
        {/* {firstCall()} */}
        <MainHeader title={'Medstick'} navigation={navigation} />
        <View style={styles.card}>
          <Calender date={getDate} />
          <View style={styles.progressCircleContainer}>
            {percentage >= 0 ? (
              <AnimatedProgressCircle
                radius={verticalScale(50)}
                percentage={percentage}
                strokeWidth={verticalScale(10)}
              />
            ) : (
              <AnimatedProgressCircle
                radius={verticalScale(50)}
                percentage={0}
                strokeWidth={verticalScale(10)}
              />
            )}
            <Text style={styles.progressText}>Overall Performance</Text>
          </View>
        </View>

        <View style={styles.reminderView}>
          <Text style={styles.font}>Reminders</Text>
          <View style={styles.info}>
            {checkdata()}
            <CustomTooltip
              isVisible={showTip}
              setShowTip={setShowTip}
              placement="top"
              supportedOrientations={['portrait']}
              tooltipStyle={{marginLeft: 14}}
              contentStyle={{width: '100%', height: '100%'}}
              onClose={() => setShowTip(false)}
              content={
                <Text style={{fontSize: 16, color: 'grey'}}>
                  All your reminders will be shown here. Save and mark your
                  reminders to view your report in Report Tab.
                </Text>
              }>
              <TouchableOpacity
                style={styles.circle}
                activeOpacity={0.6}
                onPress={() => setShowTip(true)}>
                <FontAwesomeIcon
                  icon={faInfo}
                  color={colorPallete.mainColor}
                  size={13}
                />
              </TouchableOpacity>
            </CustomTooltip>
          </View>
        </View>
        <View style={{width: '100%', height: '44%'}}>
          {isLoading ? (
            <Loader />
          ) : (
            <Reminders
              showAlert={showAlert}
              setPercentage={setPercentage}
              data={medData}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
