import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import EditMedicineForm from './editMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import Toast from 'react-native-toast-message';
import {ErrorToast, SuccessToast} from '../../../components/atoms/customToast';
import {CustomAlert} from '../../../components/atoms/customAlert';
import Analytics from '../../../components/organisms/analytics';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const EditMedicineView = ({setCount,setEdit, item, navigation}) => {
  console.log(item,"edit item")
  let doctorName = item.doctorName;
  const [doseType, setDoseType] = useState(item.dosageType);
  const [pill, setPill] = useState(item.dosageType);

  const [prescriptionObj, setPrescriptionObj] = useState({
    doctorName: item.doctorName !== null ? item.doctorName : null,
    prescriptionId: item.prescriptionId !== null ? item.prescriptionId : null,
    contact: item.contact !== null ? item.prescriptionId : null,
    prescriptionUrl:
      item.prescriptionUrl !== null ? item.prescriptionUrl : null,
    location: item.location !== null ? item.location : null,
    specialization: item.specialization !== null ? item.specialization : null,
    doctorAppointmentList:
      item.doctorAppointmentList !== null ? item.doctorAppointmentList : null,
  });
  const [add, setAdd] = useState(item.doctorName !== null ? true : false);

  const getPrescriptionData = data => {
    setAdd(true);
    setPrescriptionObj(data);
  };

  const setType = () => {
    switch (pill) {
      case 'Tablet': {
        setDoseType('mg');
        break;
      }
      case 'Inhaler': {
        setDoseType('count');
        break;
      }
      case 'Injection': {
        setDoseType('ml');
        break;
      }
      case 'Syrup': {
        setDoseType('ml');
        break;
      }
      default: {
        setDoseType('mg');
      }
    }
  };
  useEffect(() => {
    setType();
  }, [pill]);

  const updateMedicineDetails = values => {
    console.log(values,"values")
    if (Number(values.notify) > Number(values.stocks)) {
      CustomAlert({text1: 'Notify Me should be less than Stock Unit'});
    } else {
      let obj = item;
      obj.medicineName = values.medicineName.trim();
      obj.description = values.description.trim();
      obj.dosageType = values.pill;
      obj.dosageQuantity = values.dosageQuantity;
      obj.dosagePower = values.dosagePower + ' ' + values.doseType;
      obj.leftStock = values.notify;
      obj.stock = values.stocks;
      obj.isSynced = false;

      if (prescriptionObj.doctorName !== doctorName) {
        obj.prescriptionId = prescriptionObj.prescriptionId;
        obj.doctorName = prescriptionObj.doctorName;
        obj.prescriptionUrl = prescriptionObj.prescriptionUrl;
        obj.location = prescriptionObj.location;
        obj.specialization = prescriptionObj.specialization;
        obj.contact = prescriptionObj.contact;
        obj.doctorAppointmentList = [];
      }

      getMedicine()
        .then(data => {
          const temp = data;
          console.log(data,"editdata")
          temp.map((ele, index) => {
            if (ele.userMedicineId === obj.userMedicineId) {
              temp[index] = obj;
            }
          });
          console.log(temp,"editdata2")
          AddMedicine(temp);
        })
        .then(() => {
          SuccessToast({
            text1: 'Medicine Updated Successfully',
            position: 'bottom',
          });

          setTimeout(() => {
            setCount(2)
            setEdit(false);
            
          }, 2000);
        })
        .catch(() => {
          ErrorToast({text1: 'Something Went Wrong', position: 'bottom'});
        });
    }
  };

  return (
    <View style={styles.addMedicinePage}>
      <View style={styles.closeBtn}>
        <TouchableOpacity
          activeOpacity={1}
          style={{backgroundColor: 'white'}}
          onPress={() => {setEdit(false)
          Analytics('Edit medicine','Close')
          }}>
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
              medicineName: item.medicineName,
              description: item.description,
              pill: '',
              dosageQuantity: item.dosageQuantity.toString(),
              dosagePower: item.dosagePower.split(' ')[0],
              doseType: '',
              stocks: item.stock.toString(),
              notify: item.leftStock.toString(),
            }}
            validationSchema={addMedicineSchema}
            onSubmit={values => {
              values.doseType = doseType;
              values.pill = pill;
              updateMedicineDetails(values);
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
              <EditMedicineForm
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                setFieldValue={setFieldValue}
                setPill={setPill}
                setDoseType={setDoseType}
                pill={pill}
                doseType={doseType}
                prescriptionObject={getPrescriptionData}
                add={add}
                setAdd={setAdd}
                navigation={navigation}
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
  addMedicinePage: {
    backgroundColor: 'white',
    flex: 1,
  },
  keyboardView: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 10,
  },
  closeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginLeft: 12,
    marginTop: 10,
  },
});

export default EditMedicineView;
