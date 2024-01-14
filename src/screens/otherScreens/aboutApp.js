import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from '../../styles/otherScreensStyles/aboutAppStyles';
import SubHeader from '../../components/molecules/headers/subHeader';
import {ScrollView} from 'react-native-gesture-handler';
const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SubHeader title={'About'} navigation={navigation} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={require('../../assets/images/medstick.png')}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
            Introducing India's first digital pharmacy.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Medicine Adherence app which allows user to use medicine, reminder,
            caretaker, patient, report and more features and never skip their
            medications.
          </Text>
        </View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: '#02A6AB',
              alignContent: 'center',
              height: '100%',
              padding: 20,
            },
          ]}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#f3f8f5',
              margin: 15,
            }}>
            Simple solution to one of the most abudant problem
          </Text>
          <Text
            style={{
              margin: 4,
              color: '#f3f8f5',
              paddingLeft: 4,
              fontSize: 20,
              fontWeight: '400',
              alignItems:'center'
            }}>
            we aim at providing accessible and easy to use medicine system that
            makes it easy for you to manage and avoid missing any doses.
          </Text>
          <Text
            style={{
              margin: 4,
              color: '#f3f8f5',
              paddingLeft: 4,
              fontSize: 18,
              fontWeight: '400',
              alignItems: 'center',
            }}>
            Our team of engineers, field experts and in-house pharmacists take
            the greatest care to deliver a seamless experience that saves you
            time, hassle and stress so you can focus on just getting better.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
