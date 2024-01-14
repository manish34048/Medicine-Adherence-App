import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPallete} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {Picker} from '@react-native-picker/picker';
import {Divider, TextInput} from 'react-native-paper';
import CustomButton from '../../../components/atoms/customButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import CustomModal from '../../../components/molecules/customModal';
import {styles} from '../../../styles/medicinePanelStyles/medicineFormStyles';
import {faInfoCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import RenderModalView from './renderModalView';
import {useSelector} from 'react-redux';
import {CustomAlert} from '../../../components/atoms/customAlert';
import CustomTooltip from '../../../components/atoms/customTooltip';
import Analytics from '../../../components/organisms/analytics';

const AddMedicineForm = props => {
  //React useState hooks
  const [visible, setVisible] = useState(false);
  const [showStock, setShowStock] = useState(false);
  const [showLeftStock, setShowLeftStock] = useState(false);

  //React Redux hooks
  const load = useSelector(state => state.userInfo?.data);
  const connected = useSelector(state => state.internetConnectivity?.data);

  let obj = {
    doctorName: null,
    prescriptionId: null,
    contact: null,
    prescriptionUrl: null,
    location: null,
    specialization: null,
  };

  return (
    <View style={styles.mainView}>
      <CustomModal
        modalVisible={visible}
        type="fade"
        onRequestClose={() => setVisible(!visible)}
        modalView={<RenderModalView props={props} setVisible={setVisible} />}
        customStyles={{height: '100%'}}
      />
      <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          label="Medicine Name"
          mode="outlined"
          outlineColor="lightgrey"
          text="medicineName"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.medicineName}
          right={
            connected && load ? (
              <TextInput.Icon
                onPress={() => setVisible(true)}
                name={() => (
                  <FontAwesomeIcon
                    size={20}
                    icon={faSearch}
                    color={colorPallete.mainColor}
                  />
                )}
              />
            ) : null
          }
        />
        {props.errors.medicineName && props.touched.medicineName && (
          <Text style={styles.errorText}>{props.errors.medicineName}</Text>
        )}
      </View>
      <View style={styles.inputField}>
        <InputField
          styles={styles.description}
          label="Description"
          mode="outlined"
          outlineColor="lightgrey"
          text="description"
          activeOutlineColor={colorPallete.mainColor}
          {...props}
          value={props.values.description}
          multiline={true}
          selectTextOnFocus={true}
          dense={true}
        />
        {props.errors.description && props.touched.description && (
          <Text style={styles.errorText}>{props.errors.description}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.pickerView}>
          <View style={styles.picker}>
            <Picker
              style={styles.pickerField}
              dropdownIconColor={1}
              selectedValue={props.pill}
              onValueChange={val => props.setPill(val)}>
              <Picker.Item label="Tablet" value="Tablet" />
              <Picker.Item label="Injection" value="Injection" />
              <Picker.Item label="Syrup" value="Syrup" />
            </Picker>
          </View>
        </View>
        <View style={styles.subInputGroup}>
          <InputField
            styles={styles.field}
            label="Dosage Quantity"
            mode="outlined"
            outlineColor="lightgrey"
            text="dosageQuantity"
            activeOutlineColor={colorPallete.mainColor}
            {...props}
            value={props.values.dosageQuantity}
            keyboardType="numeric"
            // clearTextOnFocus={true}
            // selectTextOnFocus={true}
          />
          {props.errors.dosageQuantity && props.touched.dosageQuantity && (
            <Text style={styles.errorText}>{props.errors.dosageQuantity}</Text>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <InputField
            styles={[styles.field, {width: '97%'}]}
            text="dosagePower"
            label="Dosage Power"
            value={props.values.dosagePower}
            mode="outlined"
            outlineColor="lightgrey"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
            activeOutlineColor={colorPallete.mainColor}
            {...props}
          />
          {props.errors.dosagePower && props.touched.dosagePower && (
            <Text style={styles.errorText}>{props.errors.dosagePower}</Text>
          )}
        </View>
        <View style={styles.subInputGroup}>
          <TextInput
            disabled
            style={styles.field}
            label="Dose Type"
            value={props.doseType}
            mode="outlined"
            onChangeText={props.setDoseType}
            outlineColor="#02aba6"
            activeOutlineColor="#02aba6"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.textbox}>
          <Text style={styles.text}>Stock Units</Text>
          <CustomTooltip
            isVisible={showStock}
            placement="top"
            supportedOrientations={['portrait']}
            // tooltipStyle={{marginLeft: 4}}
            contentStyle={{width: '100%', height: '100%'}}
            onClose={() => setShowStock(false)}
            content={
              <Text style={{fontSize: 16, color: 'grey'}}>
                Enter the total stocks you want to add.
              </Text>
            }>
            <TouchableOpacity
              style={{padding: 8}}
              activeOpacity={0.8}
              onPress={() => {
                setShowStock(true)
                Analytics('Add medicine','View Stock Info')
              }}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={18}
                color={colorPallete.mainColor}
              />
            </TouchableOpacity>
          </CustomTooltip>
        </View>
        <View style={styles.unitBox}>
          <InputField
            styles={[styles.field, {width: '60%'}]}
            label="Units"
            mode="outlined"
            outlineColor="lightgrey"
            text="stocks"
            activeOutlineColor={colorPallete.mainColor}
            {...props}
            value={props.values.stocks}
            keyboardType="numeric"
            clearTextOnFocus={true}
            selectTextOnFocus={true}
          />
          {props.errors.stocks && props.touched.stocks && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.stocks}
            </Text>
          )}
        </View>
      </View>
      <View style={Styles.textView1}>
        <View style={styles.textbox}>
          <View>
            <Text style={Styles.text}>Notify me when only </Text>
            <Text style={styles.subText}>(Optional)</Text>
          </View>

          <CustomTooltip
            isVisible={showLeftStock}
            placement="top"
            supportedOrientations={['portrait']}
            // tooltipStyle={{marginLeft: 4}}
            contentStyle={{width: '100%', height: '100%'}}
            onClose={() => setShowLeftStock(false)}
            content={
              <Text style={{fontSize: 16, color: 'grey'}}>
                Gives an alert when required stocks are left.
              </Text>
            }>
            <TouchableOpacity
              style={{padding: 8}}
              activeOpacity={0.8}
              onPress={() => {
                setShowLeftStock(true)
                Analytics('Add medicine','View Left Stock Info')
                }}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={18}
                color={colorPallete.mainColor}
              />
            </TouchableOpacity>
          </CustomTooltip>
        </View>
        <View style={styles.unitBox}>
          <InputField
            styles={[styles.field, {width: '60%'}]}
            label="Units"
            mode="outlined"
            outlineColor="lightgrey"
            text="notify"
            activeOutlineColor={colorPallete.mainColor}
            {...props}
            value={props.values.notify}
            keyboardType="numeric"
            clearTextOnFocus={true}
            selectTextOnFocus={true}
          />
          {props.errors.notify && props.touched.notify && (
            <Text style={styles.errorText}>{props.errors.notify}</Text>
          )}
        </View>
      </View>
      <View style={Styles.textView}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Add Prescription Here </Text>
          <Text style={styles.subText}>(Optional)</Text>
        </View>

        {props.add ? (
          <View style={styles.addedBtn}>
            <CustomButton
              title={'Added'}
              btnStyles={styles.secondaryBtn}
              titleStyle={{color: colorPallete.mainColor}}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                props.prescriptionObject(obj);
                props.setAdd(false);
                Analytics('Add medicine','Add Prescription')

              }}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                color={colorPallete.redPercentageColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addBtn}>
            <CustomButton
              title={'Add'}
              handleSubmit={() => {
                if (props.values.medicineName.length !== 0) {
                  props.navigation.navigate('AddPrescriptionPanel', {
                    prescriptionObject: props.prescriptionObject,
                  });
                } else {
                  CustomAlert({text1: 'Fill rest details first'});
                }
              }}
              btnStyles={styles.btnStyles}
            />
          </View>
        )}
      </View>
      <Divider style={styles.divider} />
      <CustomButton
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={styles.contStyles}
        btnStyles={styles.saveBtn}
      />
    </View>
  );
};

export default AddMedicineForm;
