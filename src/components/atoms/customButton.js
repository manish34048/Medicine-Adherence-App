import React from 'react';
import {Button} from 'react-native-elements';

const CustomButton = props => {
  return (
    <Button
      loading={props.loading}
      titleStyle={props.titleStyle}
      title={props.title}
      buttonStyle={props.btnStyles}
      containerStyle={props.contStyles}
      onPress={props.handleSubmit}
      disabled={props.disabled}
    />
  );
};

export default CustomButton;
