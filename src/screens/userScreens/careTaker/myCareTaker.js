import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton'
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {
  myCaretakerClear,
  myCaretakerRequest,
} from '../../../redux/action/caretaker/myCaretakerAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPalette';
import NoInternet from '../../../components/atoms/noInternet';

const MyCareTaker = ({navigation}) => {
  //React Redux Hooks
  const dispatch = useDispatch();
  const res = useSelector(state => state.myCaretaker);
  const errorState = useSelector(state => state.myCaretaker.error);
  const connected = useSelector(state => state.internetConnectivity?.data);

  //React useState hook
  const [pageNo, setPageNo] = useState(0);
  const [caretaker, setCaretaker] = useState([]);
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
    pageNo === 0 ? dispatch(myCaretakerRequest(pageNo)) : null;
    return () => false;
  }, []);

  useEffect(() => {
    if (res?.data !== null && res.data.length !== 0) {
      setRefresh(false);
      setCaretaker([...caretaker, ...res.data]);
      dispatch(myCaretakerClear());
    }
    return () => false;
  }, [res]);

  //FlatList OnEnd Function
  const onEnd = () => {
    let a = pageNo + 1;
    if (caretaker?.length % 8 === 0 && a !== 0) {
      dispatch(myCaretakerRequest(a));
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
            ? navigation.navigate('CareTakerProfile', {profile: item})
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
          {caretaker.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={{width: '70%'}}
                source={require('../../../assets/images/nocaretakers.jpg')}
              />
            </View>
          ) : (
            <FlatList
              data={caretaker}
              renderItem={renderItem}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() =>
                setOnEndReachedCalledDuringMomentum(false)
              }
              onEndReached={({distanceFromEnd}) => {
                if (!onEndReachedCalledDuringMomentum) {
                  !errorState ? onEnd() : null;
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
                    dispatch(myCaretakerRequest(a));
                    setPageNo(a);
                    setIsLoading(true);
                    setCaretaker([]);
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
                text={'Patient'}
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

export default MyCareTaker;
