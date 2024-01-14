import {Image} from 'react-native';
import React from 'react';

const CustomImage = props => {
  return (
    <Image
      style={props?.styles}
      resizeMode={props?.resizeMode}
      source={props?.source}
    />
  );
};

export default CustomImage;
