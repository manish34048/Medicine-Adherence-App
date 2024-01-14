import React from 'react';
import {Picker} from '@react-native-picker/picker';

const PickerField = props => {
  const list = props?.pickerItem;
  const text = props?.text;
  return (
    <Picker
      dropdownIconColor={1}
      style={props.styles}
      mode={props.mode}
      selectedValue={props.selectedValue}
      onValueChange={itemchange => props.setFieldValue(text, itemchange)}>
      {list.map(item => (
        <Picker.Item key={item.label} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default PickerField;
