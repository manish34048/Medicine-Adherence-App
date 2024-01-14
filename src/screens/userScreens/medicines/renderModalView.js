import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {useSelector, useDispatch} from 'react-redux';
import {
  searchMedicineClear,
  searchMedicineRequest,
} from '../../../redux/action/userMedicine/searchMedicineAction';
import {TextInput} from 'react-native-paper';
import {
  faArrowLeft,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {ListItem} from 'react-native-elements';
import {serverErrors} from '../../../constants/statusCodes';
import ErrorBoundary from '../../otherScreens/errorBoundary';

const RenderModalView = ({setVisible, props}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.searchMedicine?.data);
  const error = useSelector(state => state.searchMedicine?.error);
  const [pageNo, setPageNo] = useState(0);
  const [tempSearch, setTempSearch] = useState([]);
  const [med, setMed] = useState('');
  const [loading, setLoading] = useState(true);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  const activityIndicator = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colorPallete.mainColor} />
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [loading]);

  useEffect(() => {
    if (res !== null && res?.result.length !== 0) {
      setLoading(false);
      setTempSearch([...tempSearch, ...res.result]);
      dispatch(searchMedicineClear());
    }
  }, [res]);

  const apiCall = (medicine, pageNo) => {
    if (medicine.length !== 0) {
      let medicineName = medicine.trim();
      dispatch(searchMedicineRequest({medicineName, pageNo}));
    }
  };

  const onEnd = () => {
    let a = pageNo + 1;
    if (tempSearch.length % 8 === 0 && a !== 0) {
      apiCall(med, a);
      setPageNo(a);
    }
  };

  const setData = item => {
    setVisible(false);
    dispatch(searchMedicineClear());
    props.setFieldValue('medicineName', item.medicineName);
    props.setFieldValue('description', item.description);
    props.setKey(false);
    props.setMedId(item.medicineId);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{marginTop: 4}}
        onPress={() => {
          setData(item);
        }}>
        <ListItem
          style={{marginHorizontal: 8}}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <ListItem.Content>
            <View style={{}}>
              <ListItem.Title
                style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                <Text style={{fontWeight: 'bold'}}>Medicine : </Text>
                {item.medicineName}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                <Text style={{fontWeight: 'bold'}}>Description : </Text>
                {item.description}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backBtnCont}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
            dispatch(searchMedicineClear());
            setPageNo(0);
            setTempSearch([]);
          }}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={22}
            color={colorPallete.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <TextInput
          placeholder="Search Medicine"
          mode="outlined"
          onChangeText={text => {
            setMed(text);
            setTempSearch([]);
            setPageNo(0);
          }}
          outlineColor={colorPallete.mainColor}
          activeOutlineColor={colorPallete.mainColor}
          style={styles.field}
          value={med}
          right={
            med.length !== 0 ? (
              <TextInput.Icon
                onPress={() => {
                  setTempSearch([]);
                  dispatch(searchMedicineClear());
                  setPageNo(0);
                  setTimeout(() => {
                    setLoading(true);
                    apiCall(med, 0);
                  }, 1000);
                }}
                name={() => (
                  <FontAwesomeIcon
                    size={20}
                    icon={faSearch}
                    color={colorPallete.mainColor}
                  />
                )}
              />
            ) : null
          }
          left={
            <TextInput.Icon
              onPress={() => {
                setMed('');
                dispatch(searchMedicineClear());
                setPageNo(0);
                setTempSearch([]);
              }}
              name={() => (
                <FontAwesomeIcon
                  size={20}
                  icon={faXmark}
                  color={colorPallete.mainColor}
                />
              )}
            />
          }
          clearTextOnFocus={true}
        />
      </View>
      {loading ? (
        activityIndicator()
      ) : (
        <>
          {error === serverErrors.SERVER_ERROR ? (
            <ErrorBoundary />
          ) : (
            <>
              {error === serverErrors.NOT_FOUND && tempSearch.length === 0 ? (
                <View style={styles.errorCont}>
                  <Text style={styles.text1}>Medicine Not Found</Text>
                  <Text style={styles.text2}>(Please Enter Manually)</Text>
                </View>
              ) : (
                <>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tempSearch}
                    renderItem={renderItem}
                    contentContainerStyle={{
                      backgroundColor: colorPallete.backgroundColor,
                    }}
                    style={{width: '100%'}}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() =>
                      setOnEndReachedCalledDuringMomentum(false)
                    }
                    onEndReached={({distanceFromEnd}) => {
                      if (!onEndReachedCalledDuringMomentum) {
                        !error ? onEnd() : null;
                        setOnEndReachedCalledDuringMomentum(true);
                      }
                    }}
                    keyExtractor={item => item.medicineId}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPallete.backgroundColor,
    alignItems: 'center',
  },
  backBtnCont: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  textContainer: {marginVertical: 10, width: '96%'},
  field: {width: '100%', alignSelf: 'center'},
  errorCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text1: {color: 'black', fontSize: 20, fontWeight: '500'},
  text2: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
  loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default RenderModalView;
