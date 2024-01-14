import {TextInput} from 'react-native';
import React from 'react';

const CustomTextInput = props => {
  return (
    <TextInput
      placeholder={props.placeholder}
      textContentType={props.textContentType}
      placeholderTextColor={props.placeholderTextColor}
      mode={props.mode}
      style={props.styles}
      onChangeText={props.handleChange(props.text)}
      value={props.values}
      outlineColor={props.outlineColor}
      activeOutlineColor={props.activeOutlineColor}
    />
  );
};

export default CustomTextInput;
