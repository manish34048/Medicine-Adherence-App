import {View, Image, ImageBackground, Text, ScrollView} from 'react-native';
import React from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {styles} from '../../../styles/careTakerStyles/careTakerProfileStyles';
import {Card, Divider} from 'react-native-paper';
import ErrorBoundary from '../../otherScreens/errorBoundary';
import {monthName} from '../../../constants/constants';
import {colorPallete} from '../../../components/atoms/colorPalette';

const CareTakerProfile = ({navigation, route}) => {
  const item = route.params.profile;
  const dateHandler = date => {
    let dob = date.split('-');
    return dob[2] + '-' + monthName[dob[1]] + '-' + dob[0];
  };
  return (
    <>
      <SubHeader navigation={navigation} title={'Caretaker Profile'} />
      {item === null ? (
        <ErrorBoundary />
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: colorPallete.basicColor,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../../assets/images/background3.png')}
              style={styles.mainCont}>
              <View style={styles.imgCont}>
                <Image
                  source={{
                    uri:
                      item?.picPath !== ''
                        ? item.picPath
                        : 'https://i.stack.imgur.com/l60Hf.png',
                  }}
                  style={styles.img}
                />
              </View>
              <View style={styles.userDetialsCont}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
              <Card style={styles.card1}>
                <View style={styles.mainView}>
                  <View style={styles.subCont}>
                    <View style={styles.subView1}>
                      <Text style={styles.heading}>Contact No</Text>
                    </View>
                    <View style={styles.subView2}>
                      {item.contact ? (
                        <Text style={styles.content}>{item.contact}</Text>
                      ) : null}
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.subCont}>
                    <View style={styles.subView1}>
                      <Text style={styles.heading}>Location</Text>
                    </View>
                    <View style={styles.subView2}>
                      {item?.address ? (
                        <Text style={styles.content}>
                          {item.address +
                            ', ' +
                            item.state +
                            ', ' +
                            item.country}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.subCont}>
                    <View style={styles.subView1}>
                      <Text style={styles.heading}>DOB</Text>
                    </View>
                    <View style={styles.subView2}>
                      {item.dateOfBirth ? (
                        <Text style={styles.content}>
                          {dateHandler(item.dateOfBirth)}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.subCont}>
                    <View style={styles.subView1}>
                      <Text style={styles.heading}>Blood Group</Text>
                    </View>
                    <View style={styles.subView2}>
                      {item.bloodGroup ? (
                        <Text style={styles.content}>{item.bloodGroup}</Text>
                      ) : null}
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.subCont}>
                    <View style={styles.subView1}>
                      <Text style={styles.heading}>Gender</Text>
                    </View>
                    <View style={styles.subView2}>
                      {item.gender ? (
                        <Text style={styles.content}>{item.gender}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </Card>
            </ImageBackground>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default CareTakerProfile;
