import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/patientStyles/myPatientsStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {
  myPatientsClear,
  myPatientsRequest,
} from '../../../redux/action/patients/myPatientsAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPalette';
import NoInternet from '../../../components/atoms/noInternet';

const MyPatients = ({navigation}) => {
  //React Redux Hooks
  const dispatch = useDispatch();
  const res = useSelector(state => state.myPatients?.data);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const errorState = useSelector(state => state.myPatients?.error);

  //React useState hook
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  //React useEffect hook
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => false;
  }, [isLoading]);

  useEffect(() => {
    pageNo === 0 ? dispatch(myPatientsRequest(pageNo)) : null;
    return () => false;
  }, []);

  useEffect(() => {
    if (res !== null && res?.length !== 0) {
      setRefresh(false);
      setMyPatients([...myPatients, ...res]);
      dispatch(myPatientsClear());
    }
    return () => false;
  }, [res]);

  //FlatList OnEnd Function
  const onEnd = () => {
    let a = pageNo + 1;
    if (myPatients?.length % 8 === 0 && a !== 0) {
      dispatch(myPatientsRequest(a));
      setPageNo(a);
    }
  };

  //FlatList RenderItem Function
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.top}
        onPress={() => {
          connected
            ? navigation.navigate('PatientProfile', {profile: item})
            : null;
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={item.userName} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {item.userName}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {item.contact}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {myPatients.length === 0 ? (
            <View style={styles.imgCont}>
              <CustomImage
                resizeMode="contain"
                styles={{width: '70%'}}
                source={require('../../../assets/images/nopatients.png')}
              />
            </View>
          ) : (
            <FlatList
              data={myPatients}
              renderItem={renderItem}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() =>
                setOnEndReachedCalledDuringMomentum(false)
              }
              onEndReached={({distanceFromEnd}) => {
                if (!onEndReachedCalledDuringMomentum) {
                  errorState === null ? onEnd() : null;
                  setOnEndReachedCalledDuringMomentum(true);
                }
              }}
              keyExtractor={item => item.userId}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    setRefresh(true);
                    let a = 0;
                    dispatch(myPatientsRequest(a));
                    setPageNo(a);
                    setIsLoading(true);
                    setMyPatients([]);
                  }}
                  refreshing={refresh}
                  colors={[colorPallete.mainColor]}
                />
              }
            />
          )}

          {connected ? (
            <View style={styles.button}>
              <AddButton
                text={'Caretaker'}
                routeName={'SearchScreen'}
                navigation={navigation}
                styles={styles.addBtn}
              />
            </View>
          ) : (
            <NoInternet />
          )}
        </>
      )}
    </View>
  );
};

export default MyPatients;
