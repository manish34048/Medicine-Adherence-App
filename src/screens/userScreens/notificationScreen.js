import {View, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import NotificationCard from '../../components/molecules/notificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearAllNotification,
  loadGetAllNotification,
} from '../../redux/action/notification/getAllNotification';
import {colorPallete} from '../../components/atoms/colorPalette';
import Loader from '../../components/atoms/loader';
import CustomImage from '../../components/atoms/customImage';
import NoInternet from '../../components/atoms/noInternet';

const NotificationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [notification, setNotification] = useState([]);
  const [scrollEnd, setScrollEnd] = useState(true);

  const res = useSelector(state => state.getAllNotificationReducer?.data);
  console.log(initialState,"result")

  const connected = useSelector(state => state.internetConnectivity?.data);

  const loading = useSelector(
    state => state.getAllNotificationReducer?.loading?.loader,
  );
  const initialState=useSelector(state=>state.getAllNotificationReducer)

  useEffect(() => {
    if(res=== undefined)
    {
console.log('error')
    }
    else{

    
    if (res?.object.length !== 0 && res !== null) {
      setNotification([...notification, ...res?.object]);
      dispatch(clearAllNotification());
    }
  }}, [res]);

  useEffect(() => {
    dispatch(loadGetAllNotification(pageNo));
  }, []);

  const onEnd = () => {
    let a = pageNo + 1;
    if (notification.length % 8 === 0 && a !== 0 && res?.object.length !== 0) {
      dispatch(loadGetAllNotification(a));
      setPageNo(a);
    }
  };

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

  return (
    <View style={styles.container}>
      <SubHeader title={'Notifications'} navigation={navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {notification?.length === 0 ? (
            <>
              <View style={styles.imgContainer}>
                <CustomImage
                  resizeMode="contain"
                  styles={styles.img}
                  source={require('../../assets/images/noNotification.png')}
                />
              </View>
            </>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={notification}
              keyExtractor={item => item.notificationId}
              renderItem={({item}) => (
                <NotificationCard
                  text={item.message}
                  date={item.localDate}
                  time={item.localTime}
                  notificationId={item.notificationId}
                  sender={item.sender}
                />
              )}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => setScrollEnd(false)}
              onEndReached={({distanceFromEnd}) => {
                if (!scrollEnd) {
                  onEnd();
                  setScrollEnd(true);
                }
              }}
            />
          )}
          {connected ? null : <NoInternet />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {width: '80%'},
});

export default NotificationScreen;
