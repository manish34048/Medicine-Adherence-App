import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {Formik} from 'formik';
import PrescriptionForm from './prescriptionForm';
import {prescriptionValidationSchema} from '../../../constants/validations';
import CustomModal from '../../../components/molecules/customModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getPrescription, savePrescription} from '../../../utils/storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {ErrorToast, SuccessToast} from '../../../components/atoms/customToast';
import Analytics from '../../../components/organisms/analytics';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AddPrescription = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const images = [
    {
      url: uri,
    },
  ];

  const savePrescriptionValues = values => {  
    
    let prescription_id = uuid.v4();

    let obj = {
      prescriptionId: prescription_id,
      doctorName: values.doctorName.trim(),
      specialization: values.specialization.trim(),
      contact: values.contact.trim(),
      location: values.location.trim(),
      prescriptionUrl: values.image,
      flag: false,
    };

    getPrescription()
      .then(data => {
        if (data !== null) {
          const temp = [...data, obj];
          savePrescription(temp);
          SuccessToast({
            text1: 'Prescription Added Successfully',
            position: 'bottom',
          });
        } else if (data === null || data === undefined) {
          let temp = [];
          temp.push(obj);
          savePrescription(temp);
          SuccessToast({
            text1: 'Prescription Added Successfully',
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
      <SubHeader navigation={navigation} title={'Attach Prescription'} />
      <CustomModal
        modalVisible={visible}
        modalView={
          <View style={styles.modalView}>
            <View style={styles.touchable}>
              <TouchableOpacity
                onPress={() => {setVisible(false)
                Analytics('Add Prescription Screen ','Add Presccription')
                }}
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
        onRequestClose={() => setVisible(!visible)}
      />
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
              doctorName: '',
              specialization: '',
              contact: '',
              location: '',
              image: '',
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
  container: {flex: 1, backgroundColor: colorPallete.mainColor},
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
});

export default AddPrescription;
