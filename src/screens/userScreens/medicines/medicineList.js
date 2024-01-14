import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {faNoteSticky} from '@fortawesome/free-regular-svg-icons';
import {deviceWidth} from '../../../components/atoms/constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CustomModal from '../../../components/molecules/customModal';
import EditNotes from './editNotes';
import EditMedicineView from './editMedicineView';
import {monthName} from '../../../constants/constants';
import Analytics from '../../../components/organisms/analytics';
import { useDispatch } from 'react-redux';
import { syncDataRequest } from '../../../redux/action/userMedicine/syncDataAction';
import { getMedicine } from '../../../utils/storage';

const MedicineList = ({route, navigation}) => {
  const data = route.params?.data;
  console.log("data",data)
  const [temp,setTemp]=useState('')
  const [count,setCount]=useState(1)
  console.log(count,"temp")
  const [index, setIndex] = useState(route.params?.index);
  const isCarousel = useRef(null);
  const [visible, setVisible] = useState(false);
  const [userMedicineId, setUserMedicineId] = useState('');
  const [edit, setEdit] = useState(false);
  const [medData, setMedData] = useState('');
  console.log(medData,"meddata")
  const dispatch=useDispatch()
  useEffect(()=>{
    if(count===2)
    {
      getMedicine().then(data=>{
        dispatch(syncDataRequest(data))
      })
 
}},[count])

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

  const MedicineDetailCard = ({item}) => {
    setTemp(item)
    console.log(item,"iteminmedicinelist")
    const dateHandler = date => {
      let dob = date.split('-');
      return dob[2] + '-' + monthName[dob[1]] + '-' + dob[0];
    };
    return (
      <View>
        <View style={styles.container} key={index}>
          <View style={styles.top}>
            <View style={styles.medNameContainer}>
              <View style={styles.medNameView}>
                <Text style={styles.medName}>{item.medicineName}</Text>
              </View>
              <View style={styles.iconView}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{padding: 2}}
                  onPress={() => {
                    setCount(1)
                    setEdit(true);
                    setMedData(item);
                    Analytics("Medicine List","Edit medicine Button")
                  }}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    size={20}
                    color={colorPallete.basicColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 2}}
                  activeOpacity={1}
                  onPress={() => {
                    setVisible(true);
                    setUserMedicineId(item?.userMedicineId);
                    Analytics("Medicine List","View medicine Button")

                  }}>
                  <FontAwesomeIcon
                    icon={faNoteSticky}
                    size={20}
                    color={colorPallete.basicColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={{paddingHorizontal: 15}}>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Description : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.description}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Dosage Quantity : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.dosageQuantity}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Dosage Power : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.dosagePower}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Total Stock : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.stock}</Text>
                  </View>
                </View>
                <View style={styles.prescriptionContainer}>
                  <View style={styles.prescriptionView}>
                    <Text style={styles.prescriptionText}>
                      Prescription Details
                    </Text>
                  </View>
                  <View style={styles.line}></View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Doctor Name : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.doctorName}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Contact : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.contact}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Specialization : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.specialization}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Loaction : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.location}</Text>
                  </View>
                </View>
                <View style={styles.prescriptionContainer}>
                  <View style={styles.prescriptionView}>
                    <Text style={styles.prescriptionText}>
                      Reminder Details
                    </Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.itemView}>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemHeading}>Start Date : </Text>
                    </View>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemData}>
                        {item.startDate !== null
                          ? dateHandler(item.startDate)
                          : null}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemView}>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemHeading}>End Date : </Text>
                    </View>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemData}>
                        {item.endDate !== null && item.endDate !== 'No End Date'
                          ? dateHandler(item.endDate)
                          : item.endDate}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemView}>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemHeading}>Title : </Text>
                    </View>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemData}>{item.reminderTitle}</Text>
                    </View>
                  </View>
                  <View style={styles.itemView}>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemHeading}>Timings : </Text>
                    </View>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemData} numberOfLines={2}>
                        {item.reminderTime}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemView}>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemHeading}>Days : </Text>
                    </View>
                    <View style={styles.itemWidth}>
                      <Text style={styles.itemData} numberOfLines={2}>
                        {item.days}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  return edit ? (
    <EditMedicineView
      setCount={setCount}
      item={medData}
      setEdit={setEdit}
      navigation={navigation}
    />
  ) : (
    <View style={styles.container1}>
      <SubHeader title={'Medicine Description'} navigation={navigation} />
      <CustomModal
        type="fade"
        modalVisible={visible}
        onRequestClose={() => setVisible(!visible)}
        modalView={
          <EditNotes userMedicineId={userMedicineId} setVisible={setVisible} />
        }
      />
      <View style={styles.carouselContainer}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          centerContent={true}
          renderItem={MedicineDetailCard}
          firstItem={index}
          sliderWidth={deviceWidth}
          horizontal={true}
          itemWidth={deviceWidth / 1.1}
          onSnapToItem={index => {
            setIndex(index);
          }}
          useScrollView={true}
          scrollEnabled={true}
          activeSlideAlignment="center"
          enableSnap={true}
          activeSlideOffset={20}
          snapToInterval={3}
          enableMomentum={true}
          scrollEndDragDebounceValue={9000}
          inactiveSlideShift={0}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: 'black',
            marginTop: -60,
          }}
          dotContainerStyle={{
            borderWidth: 2,
            borderColor: '#f0f0f0',
            backgroundColor: 'white',
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={0.6}
          dotColor={colorPallete.appColor}
          inactiveDotColor={'grey'}
        />
      </View>
    </View>
  );
};

export default MedicineList;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: colorPallete.backgroundColor,
    flex: 1,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    backgroundColor: colorPallete.backgroundColor,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colorPallete.backgroundColor,
  },
  top: {
    backgroundColor: colorPallete.backgroundColor,
    width: '100%',
    borderRadius: 10,
    height: '92%',
    elevation: 2,
    opacity: 1,
  },
  medNameContainer: {
    backgroundColor: colorPallete.appColor,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  medNameView: {width: '70%', left: 10},
  iconView: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-evenly',
  },
  medName: {fontSize: 20, fontWeight: '600', color: colorPallete.basicColor},
  itemHeading: {fontSize: 16, fontWeight: '600', color: 'gray'},
  itemWidth: {width: '50%'},
  itemView: {flexDirection: 'row', paddingVertical: 12, width: '100%'},
  itemData: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
  line: {height: 1, width: '100%', backgroundColor: 'grey', marginTop: 4},
  prescriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  prescriptionView: {
    width: '100%',
  },
  prescriptionText: {fontSize: 21, color: colorPallete.black},
});
