import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPallete} from '../../../components/atoms/colorPalette';
import CustomButton from '../../../components/atoms/customButton';
import {Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import Analytics from '../../../components/organisms/analytics';

const PrescriptionForm = props => {



  const openCamera = () => {
    ImagePicker.openCamera({
      width: 620,
      height: 820,
      cropping: true,
    }).then(image => {
      props.setFieldValue('image', image.path);
      props.setUri(image.path);
    });
  };

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 620,
      height: 820,
      cropping: true,
    }).then(image => {
      props.setFieldValue('image', image.path);
      props.setUri(image.path);
    });
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>DETAILS</Text>
      <View style={styles.inputField}>
        <InputField
          styles={styles.bio}
          label="Doctor Name"
          mode="outlined"
          outlineColor="lightgrey"
          text="doctorName"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.doctorName}
        />
        {props.errors.doctorName && props.touched.doctorName && (
          <Text style={styles.errorText}>{props.errors.doctorName}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.bio}
          label="Specialization"
          mode="outlined"
          outlineColor="lightgrey"
          text="specialization"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.specialization}
        />
        {props.errors.specialization && props.touched.specialization && (
          <Text style={styles.errorText}>{props.errors.specialization}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.bio}
          label="Contact"
          mode="outlined"
          outlineColor="lightgrey"
          text="contact"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.contact}
          keyboardType="numeric"
        />
        {props.errors.contact && props.touched.contact && (
          <Text style={styles.errorText}>{props.errors.contact}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.bio}
          label="Location"
          mode="outlined"
          outlineColor="lightgrey"
          text="location"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.location}
        />
        {props.errors.location && props.touched.location && (
          <Text style={styles.errorText}>{props.errors.location}</Text>
        )}
      </View>

      <Divider style={styles.divider} />

      <View>
        <Text style={styles.uploadText}>UPLOAD</Text>
        <Text style={styles.subText}>
          Please upload images of valid prescription from your doctor.
        </Text>
        <View style={styles.touchableCont}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            activeOpacity={1}
            onPress={()=>{openCamera()
            Analytics('Prescription Form','Open Camera')
            }}>
            <View style={styles.touchableBtn}>
              <FontAwesomeIcon icon={faCamera} color={'white'} size={20} />
            </View>
            <Text style={styles.text1}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', marginLeft: 30}}
            activeOpacity={1}
            onPress={()=>{uploadPhoto()
              Analytics('Prescription Form','Open Gallery')
            }}>
            <View style={styles.touchableBtn}>
              <FontAwesomeIcon icon={faImage} color={'white'} size={20} />
            </View>
            <Text style={styles.text1}>Gallery</Text>
          </TouchableOpacity>
          <View style={styles.imgCont}>
            {props.values.image ? (
              <View style={styles.imgView}>
                <TouchableOpacity
                  onPress={() => props.setVisible(true)}
                  activeOpacity={1}
                  style={styles.imgSubView}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: props?.values?.image}}
                    style={styles.img}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.closeBtn}
                  onPress={() => {
                    props.setFieldValue('image', '');
                    props.setUri('');
                    Analytics('Prescription Form','Close without uploading image')

                  }}>
                  <FontAwesomeIcon 
                    icon={faCircleXmark}
                    size={18}
                    color={colorPallete.redPercentageColor}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {props.errors.image && props.touched.image && (
        <Text style={styles.errorText}>{props.errors.image}</Text>
      )}
      <Divider style={styles.divider} />

      <CustomButton
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={styles.contStyles}
        btnStyles={styles.btnStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 10,
  },
  fieldHeading: {fontSize: 17, color: 'grey', fontWeight: '500'},
  bio: {height: 50, backgroundColor: 'white', color: 'green'},
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  mainView: {
    marginTop: 16,
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 6,
  },
  divider: {height: 1, marginVertical: 14},
  uploadText: {fontSize: 16, color: 'gray'},
  subText: {color: 'black', marginTop: 10, fontSize: 15},
  touchableCont: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  touchableBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colorPallete.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {fontSize: 13, marginTop: 4},
  imgCont: {flex: 1, alignItems: 'center'},
  imgView: {height: 128},
  imgSubView: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderColor: 'lightgrey',
    borderWidth: 1,
    overflow: 'hidden',
  },
  img: {width: '100%', height: '100%', borderRadius: 11},
  closeBtn: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  contStyles: {alignItems: 'center', marginVertical: 40},
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    width: '50%',
    borderRadius: 5,
  },
});

export default PrescriptionForm;