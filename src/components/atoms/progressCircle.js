import {Text} from 'react-native';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import {colorPallete} from './colorPalette';

function ColorCode(percentage) {
  if (percentage < 60) {
    return colorPallete.redPercentageColor;
  } else if (61 <= percentage && percentage < 90) {
    return 'orange';
  } else {
    return colorPallete.greenPercentageColor;
  }
}

const ProgressReport = ({styles, radius, borderWidth, percent}) => {
  return (
    <ProgressCircle
      percent={percent}
      radius={radius}
      borderWidth={borderWidth}
      color={ColorCode(percent)}
      shadowColor={styles.shadowColor}
      outerCircleStyle={styles.outerCircle}
      bgColor={styles.bgColor}>
      <Text style={[styles.percentage, {color: ColorCode(percent)}]}>
        {percent + '%'}
      </Text>
    </ProgressCircle>
  );
};

export default ProgressReport;
