import {View, Animated, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import {colorPallete} from './colorPalette';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const Animatedinput = Animated.createAnimatedComponent(TextInput);

function ColorCode(percentage) {
  if (percentage < 60) {
    return colorPallete.redPercentageColor;
  } else if (61 <= percentage && percentage < 85) {
    return 'orange';
  } else {
    return colorPallete.greenPercentageColor;
  }
}

const AnimatedProgressCircle = ({
  radius,
  percentage,
  strokeWidth,
  outerCircleColor,
  innerCircleColor,
}) => {
  const duration = 2000;
  const color = ColorCode(percentage);
  const delay = 500;
  const max = 100;
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const circleRef = useRef();
  const inputRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animation(percentage);
    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
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
            strokeOpacity={innerCircleColor ? 0.5 : 0.3}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={outerCircleColor ? outerCircleColor : color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Animatedinput
        ref={inputRef}
        editable={false}
        underlineColorAndroid="transparent"
        style={[
          StyleSheet.absoluteFillObject,
          {
            textAlign: 'center',
            fontSize: radius / 2.2,
            color: outerCircleColor ? outerCircleColor : color,
          },
        ]}>
        %
      </Animatedinput>
    </View>
  );
};

export default AnimatedProgressCircle;
