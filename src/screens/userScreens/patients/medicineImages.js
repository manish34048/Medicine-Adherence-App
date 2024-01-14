import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  medicineImagesClear,
  medicineImagesRequest,
} from '../../../redux/action/patients/medicineImagesAction';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {monthName} from '../../../constants/constants';
import {serverErrors} from '../../../constants/statusCodes';
import ErrorBoundary from '../../otherScreens/errorBoundary';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.84);

const CarouselCardItem = ({item}) => {
  return (
    <View style={styles.container1}>
      <Image
        source={{
          uri: `${item?.imageUrl}`,
        }}
        style={styles.image}
      />
      <View style={styles.textCont}>
        <Text style={styles.text}>Taken at -</Text>
        <Text style={styles.header}> {item.time}</Text>
      </View>
    </View>
  );
};

const SingleImageComponent = ({item}) => {
  const [index, setindex] = useState(0);
  const dateHandler = date => {
    let dob = date.split('-');
    return dob[2] + ' ' + monthName[dob[1]] + ', ' + dob[0];
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.date}>{dateHandler(item[0].date)}</Text>
      </View>
      <View style={styles.carousel}>
        <Carousel
          layoutCardOffset={9}
          data={item}
          onSnapToItem={inde => setindex(inde)}
          renderItem={({item}) => <CarouselCardItem item={item} />}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
        {item.length > 1 ? (
          <>
            <Pagination
              dotsLength={item.length}
              activeDotIndex={index}
              dotStyle={styles.pageDot}
              inactiveDotStyle={styles.inactiveDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              containerStyle={{position: 'relative'}}
            />
          </>
        ) : null}
      </View>
    </>
  );
};

const MedicineImages = ({navigation, route}) => {
  const [imageData, setImageData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const medId = route?.params?.item;
  const dispatch = useDispatch();
  let res = useSelector(state => state.medicineImages);
  let loading = useSelector(state => state.medicineImages?.isLoading);
  let errorState = useSelector(state => state.medicineImages?.error);

  useEffect(() => {
    if (res?.data !== null) {
      let response = res?.data?.imageList;
      let map = new Map();
      for (let re = 0; re < response?.length; re++) {
        if (map.has(response[re].date)) {
          map.get(response[re].date).push(response[re]);
        } else {
          let newArr = [];
          newArr.push(response[re]);
          map.set(response[re].date, newArr);
        }
      }
      let Arr = [];
      map.forEach(it => Arr.push(it));
      setImageData(Arr);
      dispatch(medicineImagesClear());
    }
  }, [res]);

  const fetchImages = () => {
    dispatch(medicineImagesRequest({medId, pageNo}));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchImages();
      return () => {};
    }, []),
  );

  const onEnd = () => {
    let a = pageNo + 1;
    if (imageData.length % 5 === 0 && a !== 0) {
      dispatch(medicineImagesRequest({medId, a}));
      setPageNo(a);
    }
  };

  return (
    <View style={styles.mainView}>
      <SubHeader navigation={navigation} title={'Medicine Images'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {errorState === serverErrors.SERVER_ERROR ? (
            <ErrorBoundary />
          ) : (
            <>
              {imageData.length === 0 &&
              errorState === serverErrors.NOT_FOUND ? (
                <View style={styles.imgCont}>
                  <CustomImage
                    styles={styles.img}
                    resizeMode="contain"
                    source={require('../../../assets/images/noImagesPatient.png')}
                  />
                </View>
              ) : (
                <>
                  <FlatList
                    data={imageData}
                    renderItem={({item}) => (
                      <SingleImageComponent item={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={onEnd}
                    onEndReachedThreshold={0.01}
                    showsVerticalScrollIndicator={false}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 10,
    marginVertical: 4,
  },
  header: {
    color: '#222',
    fontSize: 14,
    fontWeight: '500',
  },
  bodyView: {flexDirection: 'row', justifyContent: 'space-between'},
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 2,
  },
  text: {color: 'black', fontWeight: '600', fontSize: 16},

  //main
  container: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 6,
  },
  date: {fontSize: 18, fontWeight: '600', color: 'black'},
  carousel: {backgroundColor: 'white', flex: 1},
  pageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colorPallete.mainColor,
  },
  inactiveDot: {
    backgroundColor: 'black',
  },

  mainView: {flex: 1, backgroundColor: 'white'},
  imgCont: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '80%'},
});

export default MedicineImages;
