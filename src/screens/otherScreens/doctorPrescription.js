import {View, Text, Animated, ScrollView} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import SubHeader from '../../components/molecules/headers/subHeader';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {Card, Divider} from 'react-native-paper';
import {styles} from '../../styles/otherScreensStyles/prescriptionsStyles';
import CustomModal from '../../components/molecules/customModal';
import RenderModalView from './renderModalView';
import Analytics from '../../components/organisms/analytics';

const DoctorPrescription = ({navigation, route}) => {
  
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const item = route.params.item;
  const flag = route.params.flag;
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const images = [
    {
      url: item?.prescriptionUrl,
    },
  ];
  console.log(item.prescriptionUrl,"image")

  return edit ? (
    <RenderModalView item={item} setEdit={setEdit} navigation={navigation} />
  ) : (
    <View style={styles.container1}>
      <SubHeader
        navigation={navigation}
        title={'Doctor Prescription'}
        setEdit={setEdit}
        flag={flag}
      />
      <ScrollView>
        <View style={styles.lottieCont}>
          <LottieView
            style={styles.lottie}
            progress={progress}
            speed={0.6}
            source={require('../../assets/animation/addPrescription.json')}
          />
        </View>
        <CustomModal
          modalVisible={visible}
          text="imageViewer"
          onRequestClose={() => setVisible(!visible)}
          modalView={
            <View style={{flex: 1}}>
              <ImageViewer backgroundColor="white" imageUrls={images} />
            </View>
          }
        />
        <Card style={styles.card1}>
          <View style={styles.mainView}>
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Doctor Name</Text>
              </View>
              <View style={styles.subView2}>
                <Text style={styles.content}>{item.doctorName}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Contact No</Text>
              </View>
              <View style={styles.subView2}>
                <Text style={styles.content}>{item.contact}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Location</Text>
              </View>
              <View style={styles.subView2}>
                <Text style={styles.content}>{item.location}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.subCont}>
              <View style={styles.subView1}>
                <Text style={styles.heading}>Specialization</Text>
              </View>
              <View style={styles.subView2}>
                <Text style={styles.content}>{item.specialization}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setVisible(true);
                Analytics("doctor_prescription", "view_prescription_button");
              }}
              style={styles.touchable}>
              <Text style={styles.btn}>View Prescription</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default DoctorPrescription;
