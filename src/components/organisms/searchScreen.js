import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SubHeader from '../molecules/headers/subHeader';
import {styles} from '../../styles/organisms/searchScreenStyles';
import LottieView from 'lottie-react-native';
import {colorPallete} from '../atoms/colorPalette';
import {Formik} from 'formik';
import * as yup from 'yup';
import UserAvatar from 'react-native-user-avatar';
import {ListItem, SearchBar, Icon} from 'react-native-elements';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserRequest,
  resetUser,
} from '../../redux/action/getUserAction/getUserAction';
import {
  resetSend,
  sendReqRequest,
} from '../../redux/action/getUserAction/sendReqAction';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';
import {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from '../../components/atoms/customToast';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const SearchScreen = ({navigation}) => {
  let route = useRoute();
  let sentby = route.params.sentBy;
  const dispatch = useDispatch();
  const res = useSelector(state => state.getUser?.data);
  const errorState = useSelector(state => state.getUser?.error);
  const res1 = useSelector(state => state.sendRequest?.data);
  const [data, setData] = useState([]);
  const loading = useSelector(state => state.getUser.isLoading);

  const activityIndicator = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colorPallete.mainColor} />
      </View>
    );
  };

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (res?.message === 'User fetched by email') {
      setData(res?.result);
    } else if (res?.message === 'Invitation sent to user with given email id') {
      InfoToast({
        text1: 'User Not Found',
        position: 'bottom',
        text2: 'Invitation mail sent',
      });
    } else if (errorState !== null) {
      ErrorToast({
        text1: 'Something went wrong',
        position: 'bottomt',
        text2:'Try again later'
      });
    }
    dispatch(resetSend());
    dispatch(resetUser());
  }, [res, errorState]);

  useEffect(() => {
    if (res1?.status === 'Success') {
      SuccessToast({text1: 'Request Sent Successfully', position: 'bottom'});
      setTimeout(() => {
        navigation.pop();
      }, 2000);
    } else if (res1?.status === 'Failed') {
      ErrorToast({
        text1: 'Already Present ',
        text2: 'In Your List',
        position: 'bottom',
      });
    } else if (res1?.status === 'Alert') {
      InfoToast({text1: 'Request Already Sent', position: 'bottom'});
    }
    dispatch(resetSend());
    dispatch(resetUser());
  }, [res1]);

  const sendMailToUser = async email => {
    let currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser.user.email === email) {
      ErrorToast({text1: 'Cannot Add Yourself', position: 'bottom'});
      return;
    }
    dispatch(getUserRequest(email));
  };

  const sendReqToCaretaker = (patient_id, fcmToken) => {
    dispatch(sendReqRequest({patient_id, sentby, fcmToken}));
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.card}>
          <View style={styles.mainView}>
            <ListItem style={styles.listView}>
              <ListItem.Content>
                <View style={styles.cont}>
                  <UserAvatar size={42} name={item.userName} />
                  <View style={styles.cardTitle}>
                    <ListItem.Title style={styles.font}>
                      {item.userName}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {item?.userDetails?.contact}
                    </ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.listButton}
                onPress={() => {
                  sendReqToCaretaker(item?.id, item?.userDetails?.fcmToken);
                }}>
                <Text style={styles.text1}>Send Request</Text>
              </TouchableOpacity>
            </ListItem>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <SubHeader navigation={navigation} title={'Search'} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: ''}}
          onSubmit={values => sendMailToUser(values.email.trim())}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <View style={{marginVertical: 10}}>
                <SearchBar
                  platform="default"
                  placeholder="Search By Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  containerStyle={{
                    backgroundColor: 'rbga(225,232,238,0)',
                  }}
                  inputContainerStyle={{
                    borderRadius: 30,
                    backgroundColor: '#EFF5F5',
                    height: 50,
                  }}
                  inputStyle={{
                    fontSize: 18,
                    color: colorPallete.mainColor,
                  }}
                  lightTheme="true"
                  placeholderTextColor={colorPallete.mainColor}
                  clearIcon={
                    <Icon
                      size={22}
                      name="search"
                      type="font-awesome"
                      color={colorPallete.mainColor}
                      onPress={() => handleSubmit()}
                      containerStyle={{padding: 8}}
                    />
                  }
                  searchIcon={
                    <Icon
                      name="remove"
                      type="font-awesome"
                      size={20}
                      onPress={() => {
                        setData([]);
                        setFieldValue('email', '');
                      }}
                      color={colorPallete.mainColor}
                      containerStyle={{marginLeft: 10}}
                    />
                  }
                />
                <Text style={styles.text}>{touched.email && errors.email}</Text>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>

      {loading ? (
        activityIndicator()
      ) : (
        <>
          {data.length === 0 ? (
            <View style={styles.lottieCont}>
              <LottieView
                source={require('../../assets/animation/user.json')}
                speed={0.6}
                progress={progress}
                style={styles.lottie}
              />
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
      <Toast visibilityTime={2000} />
    </View>
  );
};

export default SearchScreen;
