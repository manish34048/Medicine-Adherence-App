import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../../../components/atoms/customButton';
import {colorPallete} from '../../../components/atoms/colorPalette';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {updateNotesSchema} from '../../../constants/validations';
import InputField from '../../../components/atoms/inputField';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SuccessToast} from '../../../components/atoms/customToast';
import Analytics from '../../../components/organisms/analytics';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const EditNotes = ({userMedicineId, setVisible}) => {
  const isFocused = useIsFocused();
  const [note, setNote] = useState('');
  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          data.map((item, index) => {
            if (item.userMedicineId === userMedicineId) {
              setNote(data[index].notes);
            }
          });
        }
      });
    }
  }, [isFocused]);

  const saveMedicineNotes = (notes, userMedicineId) => {
    getMedicine().then(data => {
      let updatedList = data;
      updatedList.map((item, index) => {
        if (item.userMedicineId === userMedicineId) {
          updatedList[index].notes = notes;
          updatedList[index].isSynced = false;
        }
        AddMedicine(updatedList);
      });
    });
    SuccessToast({text1: 'Updated Successfully'});

    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.mainHead}>
      <View style={styles.innerBody}>
        <TouchableOpacity
          onPress={() => {setVisible(false)
          Analytics("Edit Notes",'Close')
          }}
          activeOpacity={1}
          style={styles.closeButton}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color={colorPallete.redPercentageColor}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Review</Text>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={'padding'}
          keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Formik
              validator={() => ({})}
              enableReinitialize
              initialValues={{
                review: note,
              }}
              validationSchema={updateNotesSchema}
              onSubmit={values => {
                let notes = values.review.trim();
                saveMedicineNotes(notes, userMedicineId);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.formBody}>
                  <View style={styles.textBox}>
                    <InputField
                      multiline={true}
                      mode="outlined"
                      outlineColor="#02aba6"
                      activeOutlineColor="#02aba6"
                      value={values.review}
                      styles={styles.field}
                      selectTextOnFocus={true}
                      text="review"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      label="Add Review"
                    />
                    {errors.review && touched.review && (
                      <Text style={styles.errorText}>{errors.review}</Text>
                    )}
                  </View>
                  <CustomButton
                    title={'Save'}
                    handleSubmit={handleSubmit}
                    contStyles={styles.contStyles}
                    btnStyles={styles.btnStyles}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Toast visibilityTime={1500} />
    </View>
  );
};
const styles = StyleSheet.create({
  mainHead: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  innerBody: {
    height: 370,
    width: Dimensions.get('window').width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  closeButton: {alignSelf: 'flex-end', marginRight: 14, marginTop: 8},
  textContainer: {alignItems: 'center'},
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  formBody: {alignItems: 'center', flex: 1},
  textBox: {width: '90%', marginVertical: 15},
  field: {height: 180},
  errorText: {color: 'red', marginTop: 6},
  contStyles: {
    marginTop: 20,
    width: '30%',
  },
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});

export default EditNotes;
