import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from '../../styles/profile/profileStyles';
import {Card} from 'react-native-paper';
import Loader from '../../components/atoms/loader';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileRequest} from '../../redux/action/profileAction/getUserProfileAction';

const SavedDetails = () => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.getUserProfile?.data);
  const errorState = useSelector(state => state.getUserProfile?.error);
  const loading = useSelector(state => state.getUserProfile?.isLoading);
  const dateHandler = date => {
    let dob = date.split('-');
    return dob[2] + '-' + dob[1] + '-' + dob[0];
  };

  useEffect(() => {
    dispatch(getUserProfileRequest());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 2}}>
          <Card style={styles.card}>
            <View style={styles.mainView}>
              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Bio</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.bio}</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={styles.mainView}>
              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Contact</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.contact}</Text>
                </View>
              </View>
              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Date Of Birth</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>
                    {res?.dateOfBirth ? dateHandler(res?.dateOfBirth) : null}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={styles.mainView}>
              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>BloodGroup</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.bloodGroup}</Text>
                </View>
              </View>

              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Gender</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.gender}</Text>
                </View>
              </View>
            </View>
          </Card>
          <Card style={styles.card}>
            <View style={styles.mainView}>
              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Address</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.address}</Text>
                </View>
              </View>

              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>State</Text>
                </View>
                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.state}</Text>
                </View>
              </View>

              <View style={styles.subCont}>
                <View style={styles.subView1}>
                  <Text style={styles.heading}>Country</Text>
                </View>

                <View style={styles.subView2}>
                  <Text style={styles.content}>{res?.country}</Text>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      )}
    </>
  );
};

export default SavedDetails;
