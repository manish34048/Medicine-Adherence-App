import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={'wifi-off'} color={'white'} size={16} />
      <Text style={{color: 'white', marginLeft: 6, fontSize: 15}}>
        You are currently offline.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    alignSelf: 'center',
    backgroundColor: '#3b3d3d',
    width: '93%',
    position: 'absolute',
    bottom: 6,
    borderRadius: 6,
    paddingVertical: 12,
    flexDirection: 'row',
    paddingLeft: 10,
  },
});

export default NoInternet;
