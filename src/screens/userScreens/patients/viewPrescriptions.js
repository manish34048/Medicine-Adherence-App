import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/atoms/loader';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {
  myPrescriptionsClear,
  myPrescriptionsRequest,
} from '../../../redux/action/otherScreenAction/prescriptionsAction';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import {style} from '../../../styles/patientStyles/viewPrescriptionStyles';
import ErrorBoundary from '../../../screens/otherScreens/errorBoundary';
import {serverErrors} from '../../../constants/statusCodes';
import {useFocusEffect} from '@react-navigation/native';

const ViewPrescriptions = ({navigation, route}) => {
  const dispatch = useDispatch();
  let flag = false;
  const [prescriptions, setPrescriptions] = useState([]);
  const res = useSelector(state => state.myPrescriptions);
  const errorState = useSelector(state => state.myPrescriptions?.error);
  const Id = route?.params?.id;
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  useEffect(() => {
    if (res?.data !== null && res?.data.length !== 0) {
      setRefresh(false);
      setPrescriptions([...prescriptions, ...res?.data]);
      dispatch(myPrescriptionsClear());
    }
  }, [res]);

  useFocusEffect(
    React.useCallback(() => {
      currentPage === 0
        ? dispatch(myPrescriptionsRequest({currentPage, Id}))
        : null;
    }, []),
  );

  //FlatList OnEnd Function
  const onEnd = () => {
    let a = currentPage + 1;
    if (prescriptions?.length % 8 === 0 && a !== 0) {
      let currentPage = a;
      dispatch(myPrescriptionsRequest({currentPage, Id}));
      setCurrentPage(a);
    }
  };

  const renderItem = ({item, index}) => {
    console.log(item,"itemsss")
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 400}>
        <View style={style.top}>
          <ListItem
            style={style.list}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <UserAvatar size={60} name={`${item.doctorName}`} />
            <ListItem.Content>
              <ListItem.Title style={style.patientName} numberOfLines={1}>
                <Text style={style.font}>Doctor Name: </Text>
                {`${item.doctorName}`}
              </ListItem.Title>
              <ListItem.Subtitle style={style.subtitle}>
                <Text style={style.font}>Contact No: </Text>
                {item.contact}
              </ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              style={style.btn}
              activeOpacity={1}
              onPress={() => {
                setPrescriptions([]);
                setLoading(true);
                navigation.navigate('ViewPrescription', {
                  item: item,
                  flag: flag,
                });
              }}>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={16}
                color={colorPallete.mainColor}
              />
            </TouchableOpacity>
          </ListItem>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={style.mainCont}>
      <SubHeader navigation={navigation} title={'Patient Precription'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {errorState === serverErrors.SERVER_ERROR ? (
            <ErrorBoundary />
          ) : (
            <>
              {errorState === serverErrors.NOT_FOUND &&
              prescriptions?.length === 0 ? (
                <View style={style.imgCont}>
                  <CustomImage
                    resizeMode="contain"
                    source={require('../../../assets/images/noPrescriptionPatient.png')}
                    styles={{width: '80%'}}
                  />
                </View>
              ) : (
                <FlatList
                  style={style.flatList}
                  data={prescriptions}
                  renderItem={renderItem}
                  keyExtractor={item => item.prescriptionId}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.01}
                  onMomentumScrollBegin={() =>
                    setOnEndReachedCalledDuringMomentum(false)
                  }
                  onEndReached={({distanceFromEnd}) => {
                    if (!onEndReachedCalledDuringMomentum) {
                      errorState === null ? onEnd() : null;
                      setOnEndReachedCalledDuringMomentum(true);
                    }
                  }}
                  refreshControl={
                    <RefreshControl
                      colors={[colorPallete.mainColor]}
                      tintColor={[colorPallete.mainColor]}
                      refreshing={refresh}
                      onRefresh={() => {
                        setRefresh(true);
                        let currentPage = 0;
                        dispatch(myPrescriptionsRequest({currentPage, Id}));
                        setCurrentPage(currentPage);
                        setLoading(true);
                        setPrescriptions([]);
                      }}
                    />
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ViewPrescriptions;
