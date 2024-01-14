import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import AddPrescriptionIcon from '../../atoms/addPrescriptionIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
const AddPrescriptionHeader = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <AntDesign name="arrowleft" size={30} color="#EEEEFF" />
      </TouchableOpacity>
      <View style={Styles.addPrescriptionLottie}>
        <AddPrescriptionIcon />
      </View>
    </View>
  );
};

export default AddPrescriptionHeader;
