import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {
  userMedicineListClear,
  userMedicineListRequest,
} from '../../../redux/action/patients/userMedicineListAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {faBell, faPills} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  notifyUserClear,
  notifyUserRequest,
} from '../../../redux/action/patients/notifyUserAction';
import Ripple from 'react-native-material-ripple';
import {style} from '../../../styles/patientStyles/viewMedicineStyles';
import {serverErrors} from '../../../constants/statusCodes';
import ErrorBoundary from '../../otherScreens/errorBoundary';
import {useFocusEffect} from '@react-navigation/native';

const ViewMedicines = ({navigation, route}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.patientMedicineList);
  const errorState = useSelector(state => state.patientMedicineList.error);
  const res1 = useSelector(state => state.notifyUser?.data);
  const loading = useSelector(state => state.patientMedicineList?.isLoading);
  const [medicines, setMedicines] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let resp = route?.params?.item;

  useEffect(() => {
    if (res1?.status === 'Success') {
      ToastAndroid.show('Sent Successfully', ToastAndroid.LONG);
    } else if (res1?.status === 'Failed') {
      ToastAndroid.show('Error', ToastAndroid.LONG);
    }
    dispatch(notifyUserClear());
  }, [res1]);

  useEffect(() => { 
    if (res?.data !== null) {
      setMedicines(res?.data);
      dispatch(userMedicineListClear());
    }
  }, [res]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userMedicineListRequest(resp?.userId));
    }, []),
  );

  const sendNotificationToUser = (fcmToken, medName, patientId) => {
    dispatch(notifyUserRequest({medName, fcmToken, patientId}));
  };

  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 300}>
        <TouchableOpacity
          activeOpacity={1}
          style={style.card}
          onPress={() => {
            navigation.navigate('MedicineReport', {
              item: item,
            });
          }}>
          <ListItem
            style={style.listView}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <FontAwesomeIcon
              icon={faPills}
              size={36}
              color={colorPallete.mainColor}
            />
            <ListItem.Content style={{}}>
              <ListItem.Title style={style.title} numberOfLines={1}>
                {item.medicineName}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} style={style.subtitle1}>
                {item?.days !== '' ? item?.days : null}
              </ListItem.Subtitle>
              <ListItem.Subtitle numberOfLines={1} style={style.subtitle2}>
                {item?.reminderTime !== null ? item?.reminderTime : null}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={style.options}>
              <TouchableOpacity
                activeOpacity={1}
                style={style.imagesbtn}
                onPress={() =>
                  navigation.navigate('MedicineImages', {
                    item: item?.userMedicineId,
                  })
                }>
                <Text style={style.imagesText}>Images</Text>
              </TouchableOpacity>
              <Ripple
                onPress={() => {
                  sendNotificationToUser(
                    resp?.fcmToken,
                    item?.medicineName,
                    resp?.userId,
                  );
                }}
                style={style.ripple}
                rippleCentered={true}
                rippleColor={'#413F42'}
                rippleDuration={700}
                rippleOpacity={0.87}
                rippleContainerBorderRadius={100}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={colorPallete.mainColor}
                  size={24}
                />
              </Ripple>
            </View>
          </ListItem>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={style.mainCont}>
      <SubHeader navigation={navigation} title={'Patient Medicine'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {errorState === serverErrors.SERVER_ERROR ? (
            <ErrorBoundary />
          ) : (
            <>
              {medicines.length === 0 &&
              errorState === serverErrors.NOT_FOUND ? (
                <View style={style.imgCont}>
                  <CustomImage
                    resizeMode="contain"
                    source={require('../../../assets/images/noMedicinesPatient.png')}
                    styles={{width: '80%'}}
                  />
                </View>
              ) : (
                <View style={style.flatList}>
                  <FlatList
                    data={medicines}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    refreshControl={
                      <RefreshControl
                        colors={[colorPallete.mainColor]}
                        tintColor={[colorPallete.mainColor]}
                        refreshing={refresh}
                        onRefresh={() => {
                          setRefresh(false);
                          dispatch(userMedicineListRequest(resp?.userId));
                        }}
                      />
                    }
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ViewMedicines;
