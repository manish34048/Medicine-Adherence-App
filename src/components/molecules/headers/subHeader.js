import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPallete} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AddAppointment from '../../atoms/addAppointment';
import ShareButton from '../../atoms/shareButton';
import EditButton from '../../atoms/editButton';
import DownloadButton from '../../atoms/downloadButton';
import DeletePrescription from '../../atoms/deletePrescription';

const SubHeader = ({
  title,
  navigation,
  download,
  options,
  routeName,
  doctorNameList,
  deleteBtn,
  prescriptionId,
  setPrescriptionList,
  setPrescriptionId,
  setDeleteBtn,
  setEdit,
  flag,
  errorState,
}) => {
  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backIcon}
        onPress={() => {
          navigation.pop();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={20}
          color={colorPallete.basicColor}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.subHeaderFont}>{title}</Text>
      </View>
      {title !== 'Medicine Report' ? null : errorState === null ? (
        <DownloadButton download={download} />
      ) : null}
      {title !== 'Appointment Reminders' ? null : (
        <AddAppointment
          navigation={navigation}
          routeName={routeName}
          doctorNameList={doctorNameList}
        />
      )}
      {title !== 'Send Snap' ? null : <ShareButton options={options} />}
      {title !== 'Doctor Prescription' ? null : (
        <EditButton navigation={navigation} setEdit={setEdit} flag={flag} />
      )}
      {title !== 'Prescriptions' ? null : (
        <DeletePrescription
          deleteBtn={deleteBtn}
          prescriptionId={prescriptionId}
          setPrescriptionList={setPrescriptionList}
          setPrescriptionId={setPrescriptionId}
          setDeleteBtn={setDeleteBtn}
        />
      )}
    </View>
  );
};

export default SubHeader;
