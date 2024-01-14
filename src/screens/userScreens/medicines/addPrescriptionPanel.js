import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {Divider} from 'react-native-paper';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {
  faImage,
  faSquare,
  faSquareCheck,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomButton from '../../../components/atoms/customButton';
import Toast from 'react-native-toast-message';
import CustomModal from '../../../components/molecules/customModal';
import {getPrescription} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../components/atoms/loader';
import {SuccessToast} from '../../../components/atoms/customToast';
import Analytics from '../../../components/organisms/analytics';

const AddPrescriptionPanel = ({navigation, route}) => {
  //params
  let {prescriptionObject} = route?.params;

  //React Hooks
  const isFocused = useIsFocused();
  const [uri, setUri] = useState('');
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: uri,
    },
  ];
  const [prescriptionId, setPrescriptionId] = useState('');
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => {
      false;
    };
  }, [showLoader]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = () => {
    setRefresh(false);
    getPrescription().then(data => {
      if (data !== null) {
        setPrescriptionList(data);
        console.log(prescriptionList.length,"data")
      }
    });
  };

  //FlatList RenderItem
  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 200}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (prescriptionId === item?.prescriptionId) {
              setPrescriptionId('');
            } else {
              setPrescriptionId(item?.prescriptionId);
            }
            Analytics('Add Prescription Screen','Selected Existed Prescription')
          }}>
          <View style={styles.listView}>
            <ListItem
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
              style={styles.list}>
              <ListItem.Content style={styles.content}>
                <ListItem.Title style={styles.title}>
                  {`${item.doctorName}`}
                </ListItem.Title>
                <ListItem.Title style={{}}>
                  {`${item.specialization}`}
                </ListItem.Title>
              </ListItem.Content>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{padding: 10}}
                  onPress={() => {
                    setVisible(true);
                    setUri(item.prescriptionUrl);
                    Analytics('Add Prescription Screen','Select Image')
                  }}>
                  <FontAwesomeIcon
                    icon={faImage}
                    size={20}
                    color={colorPallete.mainColor}
                  />
                </TouchableOpacity>

                {prescriptionId === item?.prescriptionId ? (
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    size={20}
                    color={colorPallete.mainColor}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSquare}
                    size={20}
                    color={colorPallete.mainColor}
                  />
                )}
              </View>
            </ListItem>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.mainView}>
      <SubHeader navigation={navigation} title={'Add Prescription'} />
      <CustomModal
        modalVisible={visible}
        text="imageViewer"
        onRequestClose={() => setVisible(!visible)}
        modalView={
          <View
            style={{
              flex: 1,
              backgroundColor: colorPallete.basicColor,
              paddingTop: 10,
              borderTopStartRadius: 12,
              borderTopEndRadius: 12,
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 6}}
              onPress={() => {setVisible(false)
                Analytics('Add Prescription Screen ','Close without saving')
              }}
              activeOpacity={1}>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                color={colorPallete.mainColor}
                size={26}
              />
            </TouchableOpacity>
            <ImageViewer imageUrls={images} backgroundColor="white" />
          </View>
        }
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Select Prescription</Text>
      </View>
      {/* <Divider style={styles.divider} /> */}

      {showLoader ? (
        <Loader />
      ) : (
        <>
          {prescriptionList?.length === 0 ? (
            <View style={styles.imgCont}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/noPrescription.png')}
                styles={styles.img}
              />
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={prescriptionList}
              keyExtractor={item => item.prescriptionId}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    setRefresh(true);
                    setPrescriptionList([]);
                    fetchData();
                    setShowLoader(true);
                    setPrescriptionId('');
                  }}
                  colors={[colorPallete.mainColor]}
                />
              }
            />
          )}
        </>
      )}

      <View style={styles.button}>
        {prescriptionId ? (
          <>
            <CustomButton
              titleStyle={styles.buttonText}
              title={'Save'}
              btnStyles={styles.btnStyles}
              contStyles={styles.contStyles}
              handleSubmit={() => {
                if (prescriptionId !== null) {
                  let a = b => b.prescriptionId === prescriptionId;
                  let index = prescriptionList.findIndex(a);
                  let data = prescriptionList[index];
                  prescriptionObject(data);
                  SuccessToast({
                    text1: 'Prescription Uploaded',
                    position: 'bottom',
                  });

                  setTimeout(() => {
                    navigation.pop();
                  }, 2000);
                }
              }}
            />
          </>
        ) : (
          <>
            <CustomButton
              disabled={showLoader}
              title={'Upload New'}
              titleStyle={styles.buttonText}
              btnStyles={styles.btnStyles}
              contStyles={styles.contStyles}
              handleSubmit={() => {
                navigation.navigate('AddPrescription');
              }}
            />
          </>
        )}
      </View>
      <Toast visibilityTime={1500} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: colorPallete.basicColor},
  textContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    color: colorPallete.mainColor,
    fontSize: 20,
    fontWeight: '400',
  },
  divider: {height: 1, marginVertical: 8},
  imgCont: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 1.274,
  },
  img: {width: '70%'},
  flatList: {marginBottom: 70, backgroundColor: colorPallete.backgroundColor},
  button: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {fontSize: 18},
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    width: '50%',
    borderRadius: 5,
  },
  contStyles: {alignItems: 'center', marginBottom: 8},
  listView: {flexDirection: 'row'},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  title: {fontWeight: '500', fontSize: 18, marginBottom: 4},
  touchableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginRight: 12,
    alignItems: 'center',
  },
  content: {marginLeft: 10},
});

export default AddPrescriptionPanel;
