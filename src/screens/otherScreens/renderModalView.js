import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colorPallete} from '../../components/atoms/colorPalette';
import CustomModal from '../../components/molecules/customModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Formik} from 'formik';
import {prescriptionValidationSchema} from '../../constants/validations';
import PrescriptionForm from '../userScreens/medicines/prescriptionForm';
import Toast from 'react-native-toast-message';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {
  AddMedicine,
  getMedicine,
  getPrescription,
  savePrescription,
} from '../../utils/storage';
import {SuccessToast, ErrorToast} from '../../components/atoms/customToast';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const RenderModalView = ({item, setEdit, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState(item.prescriptionUrl);
  const images = [
    {
      url: uri,
    },
  ];

  const savePrescriptionValues = values => {
    let prescription_id = item.prescriptionId;
    let obj = {
      prescriptionId: prescription_id,
      doctorName: values.doctorName.trim(),
      specialization: values.specialization.trim(),
      contact: values.contact,
      location: values.location.trim(),
      prescriptionUrl: values.image,
    };

    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        updatedList.map((item, index) => {
          if (item.prescriptionId === prescription_id) {
            updatedList[index].prescriptionId = obj.prescriptionId;
            updatedList[index].doctorName = obj.doctorName;
            updatedList[index].specialization = obj.specialization;
            updatedList[index].contact = obj.contact;
            updatedList[index].location = obj.location;
            updatedList[index].prescriptionUrl = obj.prescriptionUrl;
            updatedList[index].isSynced = false;
          }
        });
        AddMedicine(updatedList);
      }
    });

    getPrescription()
      .then(data => {
        if (data !== null && data.length !== 0) {
          let updatedList = data;
          updatedList.map((item, index) => {
            if (item.prescriptionId === prescription_id) {
              updatedList[index] = obj;
            }
          });
          savePrescription(updatedList);

          SuccessToast({
            text1: 'Prescription Updated Successfully',
            position: 'bottom',
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          navigation.pop();
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        ErrorToast({
          text1: 'Something Went Wrong',
          position: 'bottom',
        });
      });
  };

  return (
    <View style={styles.container}>
      <CustomModal
        modalVisible={visible}
        modalView={
          <View style={styles.modalView}>
            <View style={styles.touchable}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                activeOpacity={1}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  color={colorPallete.mainColor}
                  size={26}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.img}>
              <ImageViewer imageUrls={images} backgroundColor="white" />
            </View>
          </View>
        }
        customStyles={styles.customStyles}
        type="slide"
        onRequestClose={() => {
          setVisible(!visible);
        }}
      />
      <View style={styles.backBtn}>
        <TouchableOpacity
          activeOpacity={1}
          style={{backgroundColor: 'white'}}
          onPress={() => setEdit(false)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={colorPallete.mainColor}
            size={22}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              doctorName: item.doctorName,
              specialization: item.specialization,
              contact: item.contact.toString(),
              location: item.location,
              image: item.prescriptionUrl,
            }}
            validationSchema={prescriptionValidationSchema}
            onSubmit={values => {
              savePrescriptionValues(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <PrescriptionForm
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                setVisible={setVisible}
                setFieldValue={setFieldValue}
                setUri={setUri}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={1500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  modalView: {width: '100%', marginTop: 10},
  touchable: {alignSelf: 'flex-end', marginRight: 6},
  customStyles: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: Dimensions.get('window').width,
  },
  img: {height: '100%'},
  keyboardView: {
    flex: 1,
    backgroundColor: 'white',
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colorPallete.backgroundColor,
    marginLeft: 14,
    marginTop: 16,
  },
});

export default RenderModalView;
