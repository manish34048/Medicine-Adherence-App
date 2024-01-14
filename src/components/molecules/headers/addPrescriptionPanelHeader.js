import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';

const AddPrescriptionPanelHeader = ({navigation}) => {
  return (
    <View style={Styles.addPrescriptionHeader}>
    <TouchableOpacity onPress={() => navigation?.goBack()}>
        <AntDesign name="arrowleft" size={30} color="#EEEEFF" />
      </TouchableOpacity>
      <Text style={Styles.addPrescriptionHeaderText}>Add Prescription</Text>
    </View>
  )
}

export default AddPrescriptionPanelHeader