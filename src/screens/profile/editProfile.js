import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SavedDetails from './savedDetails';
import SubHeader from '../../components/molecules/headers/subHeader';
import {useFocusEffect} from '@react-navigation/native';
import CustomModal from '../../components/molecules/customModal';
import styles from '../../styles/profile/profileStyles';
import RenderModalView from './renderModalView';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileRequest} from '../../redux/action/profileAction/getUserProfileAction';
import {serverErrors} from '../../constants/statusCodes';
import ErrorBoundary from '../../screens/otherScreens/errorBoundary';
import {colorPallete} from '../../components/atoms/colorPalette';
import Analytics from '../../components/organisms/analytics';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.getUserProfile);
  const errorState = useSelector(state => state.getUserProfile?.error);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const [name, namestate] = useState({
    user: {name: '', photo: '', email: ''},
  });
  const [result, setResult] = useState({});
  const [img, imgstate] = useState('https://i.stack.imgur.com/l60Hf.png');

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPallete.basicColor,
          paddingHorizontal: 16,
        },
      });
  }, [navigation]);

  useEffect(() => {
    if (res?.data !== null) {
      setResult(res?.data);
    }
  }, [res]);

  useEffect(() => {
    dispatch(getUserProfileRequest());
    return () => false;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const user = await GoogleSignin.getCurrentUser();
        namestate(user);
        imgstate(user.user.photo);
      })();
    }, []),
  );

  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  return (
    <View style={styles.parentContainer}>
      <SubHeader title={'My Profile'} navigation={navigation} />
      {errorState === serverErrors.SERVER_ERROR ? (
        <ErrorBoundary />
      ) : (
        <>
          <View style={styles.childCont}>
            <Image source={{uri: img}} style={styles.image} />
            <View style={styles.infoCont}>
              <Text style={styles.name}>{name.user.name}</Text>
              <Text style={styles.email}>{name.user.email}</Text>
            </View>

            {edit ? null : (
              <TouchableOpacity
                disabled={!connected}
                activeOpacity={1}
                onPress={() => {
                  setEdit(true);
                  setIsCancel(true);
                  setModalVisible(true);
                  Analytics('myProfilePage','editProfileButtton')
                }}
                style={styles.editBtn}>
                <Text style={styles.editText}>Edit</Text>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size={16}
                  color={'white'}
                />
              </TouchableOpacity>
            )}
          </View>

          {edit ? (
            <>
              <CustomModal
                type="slide"
                modalVisible={modalVisible}
                modalView={
                  <RenderModalView
                    isCancel={isCancel}
                    onPress={() => {
                      setModalVisible(false);
                      setEdit(false);
                    }}
                    setModalVisible={setModalVisible}
                    setEdit={setEdit}
                    result={result}
                  />
                }
              />
            </>
          ) : (
            <SavedDetails />
          )}
        </>
      )}
    </View>
  );
};

export default EditProfile;
