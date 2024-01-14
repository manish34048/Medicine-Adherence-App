import {View, Animated, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedCircles= ({radius, percentage, strokeWidth, text, color}) => {
  const duration = 1000;
  const delay = 500;
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const circleRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const strokeDashoffset =
          circumference - (circumference * v.value) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [percentage]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={'grey'}
            strokeWidth={strokeWidth}
            r={radius}
            strokeOpacity={0.3}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <TextInput
        editable={false}
        underlineColorAndroid="transparent"
        style={[
          StyleSheet.absoluteFillObject,
          {textAlign: 'center', fontSize: radius / 2, color: color},
        ]}>
        {text + '%'}
      </TextInput>
    </View>
  );
};

export default AnimatedCircles;
