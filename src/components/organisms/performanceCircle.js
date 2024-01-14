import {View, Text} from 'react-native';
import React from 'react';
import ProgressReport from '../atoms/progressCircle';

const PerformanceCircle = ({styles, radius, borderWidth, percent, text}) => {
  return (
    <View style={styles.performanceContainer}>
      <ProgressReport
        styles={styles}
        radius={radius}
        borderWidth={borderWidth}
        percent={percent}
      />
      <Text style={styles.performance}>{text}</Text>
    </View>
  );
};

export default PerformanceCircle;
