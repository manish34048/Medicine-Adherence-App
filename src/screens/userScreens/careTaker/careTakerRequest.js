import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  caretakerReqClear,
  caretakerReqRequest,
} from '../../../redux/action/caretaker/caretakerRequestAction';
import {
  acceptCaretakerReqRequest,
  clearRequestStatus,
} from '../../../redux/action/caretaker/acceptCaretakerReqAction';
import {deleteCaretakerReqRequest} from '../../../redux/action/caretaker/deleteCaretakerReqAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPalette';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomModal from '../../../components/molecules/customModal';
import NoInternet from '../../../components/atoms/noInternet';
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from '../../../components/atoms/customToast';
import Toast from 'react-native-toast-message';

const CareTakerRequest = () => {
  //React Redux Hooks
  const dispatch = useDispatch();
  const res = useSelector(state => state.caretakerRequest);
  console.log(res,"res");
  const errorState = useSelector(state => state.caretakerRequest?.error);
  console.log(errorState,"error");
  const acceptedStatus = useSelector(
    state => state.acceptCaretakerRequest?.data,
  );
  console.log(acceptedStatus,"accept");
  const deletedStatus = useSelector(
    state => state.deleteCaretakerRequest?.data,
  );
  console.log(deletedStatus,"delete");
  const connected = useSelector(state => state.internetConnectivity?.data);

  //React useState hook
  const [pageNo, setPageNo] = useState(0);
  const [caretakers, setCaretakers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  const images = [
    {
      url: uri,
    },
  ];

  //React useEffect hook
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => false;
  }, [isLoading]);

  useEffect(() => {
    pageNo === 0 ? dispatch(caretakerReqRequest(pageNo)) : null;
    return () => false;
  }, []);

  useEffect(() => {
    if (acceptedStatus?.status === 'Success') {
      SuccessToast({text1: 'Request Accepted', position: 'bottom'});
      dispatch(clearRequestStatus());
    } else if (acceptedStatus?.status === 'Failed') {
      InfoToast({text1: 'Something Went Wrong', position: 'bottom'});
      dispatch(clearRequestStatus());
    }
    return () => false;
  }, [acceptedStatus]);

  useEffect(() => {
    if (deletedStatus?.status === 'Success') {
      ErrorToast({text1: 'Request Deleted', position: 'bottom'});
      dispatch(clearRequestStatus());
    } else if (deletedStatus?.status === 'Failed') {
      InfoToast({text1: 'Something Went Wrong', position: 'bottom'});
      dispatch(clearRequestStatus());
    }
    return () => false;
  }, [deletedStatus]);

  useEffect(() => {
    if (res?.data !== null && res?.data?.length !== 0) {
      setRefresh(false);
      setCaretakers([...caretakers, ...res.data]);
      dispatch(caretakerReqClear());
    }
    return () => false;
  }, [res]);

  //FlatList OnEnd Function
  const onEnd = () => {
    let a = pageNo + 1;
    if (caretakers?.length % 8 === 0 && a !== 0) {
      dispatch(caretakerReqRequest(a));
      setPageNo(a);
    }
  };

  //Request Accepted Function
  const acceptRequest = requestId => {
    dispatch(acceptCaretakerReqRequest(requestId));

    setTimeout(() => {
      setIsLoading(true);
      let a = 0;
      dispatch(caretakerReqRequest(a));
      setPageNo(a);
      setCaretakers([]);
    }, 2000);
  };

  //Request Deleted Function
  const deleteRequest = requestId => {
    dispatch(deleteCaretakerReqRequest(requestId));

    setTimeout(() => {
      setIsLoading(true);
      let a = 0;
      dispatch(caretakerReqRequest(a));
      setPageNo(a);
      setCaretakers([]);
    }, 2000);
  };

  //FlatList RenderItem Function
  const renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.avatar}>
            <TouchableOpacity
              id="touch1"
              activeOpacity={1}
              onPress={() => {
                setVisible(true);
                setUri(item.picPath);
              }}>
              <Avatar size={80} rounded source={{uri: item.picPath}} />
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.userName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.contact !== null ? 'Phone No: ' : null}
                  {item.contact !== null ? item.contact : null}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={styles.buttonView}>
              <Button
                onPress={() => {
                  acceptRequest(item.requestId);
                }}
                title="Accept"
                buttonStyle={styles.confirmButton}
                color={colorPallete.green1}
              />
              <View style={styles.space} />

              <Button
                onPress={() => {
                  deleteRequest(item.requestId);
                }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color={colorPallete.red1}
              />
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <CustomModal
        text="imageViewer"
        modalVisible={visible}
        onRequestClose={() => setVisible(!visible)}
        modalView={<ImageViewer imageUrls={images} />}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {caretakers.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../../assets/images/noRequest.png')}
              />
            </View>
          ) : (
            <FlatList
              data={caretakers}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onMomentumScrollBegin={() =>
                setOnEndReachedCalledDuringMomentum(false)
              }
              onEndReached={({distanceFromEnd}) => {
                if (!onEndReachedCalledDuringMomentum) {
                  !errorState ? onEnd() : null;
                  setOnEndReachedCalledDuringMomentum();
                }
              }}
              onEndReachedThreshold={0.1}
              keyExtractor={item => item.userId}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    setRefresh(true);
                    let a = 0;
                    dispatch(caretakerReqRequest(a));
                    setPageNo(a);
                    setIsLoading(true);
                    setCaretakers([]);
                  }}
                  refreshing={refresh}
                  colors={[colorPallete.mainColor]}
                />
              }
            />
          )}
        </>
      )}
      {connected ? null : <NoInternet />}
      <Toast visibilityTime={1500} />
    </View>
  );
};

export default CareTakerRequest;
