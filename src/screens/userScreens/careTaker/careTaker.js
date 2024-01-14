import MyCareTaker from './myCareTaker';
import React, {useState} from 'react';
import CareTakerRequest from './careTakerRequest';
import {View} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {Caretaker_nurse, Userfriend} from './allIcons';
import {styles} from '../../../styles/careTakerStyles/careTakerStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import Analytics from '../../../components/organisms/analytics';

const CareTaker = ({navigation}) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <SubHeader title={'My Caretaker'} navigation={navigation} />
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={styles.tabIndicator}
        style={styles.tab}
        variant="primary">
        <Tab.Item
          title="Caretakers"
          containerStyle={styles.tabItemContainer}
          titleStyle={styles.tabItemTitle}
          icon={Caretaker_nurse()}
        />
        <Tab.Item
          title="Caretaker request"
          titleStyle={styles.tabItemTitle}
          containerStyle={styles.tabItemContainer}
          icon={Userfriend()}
        />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabItem}>
          <MyCareTaker navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.tabItem}>
          <CareTakerRequest />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default CareTaker;
