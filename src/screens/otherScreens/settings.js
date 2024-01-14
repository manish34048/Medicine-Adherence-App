import {Linking, Share, View} from 'react-native';
import React, {useEffect} from 'react';
import SettingsList from 'react-native-settings-list';
import styles from '../../styles/otherScreensStyles/settingsStyles';
import SubHeader from '../../components/molecules/headers/subHeader';
import {useSelector} from 'react-redux';
import {ErrorToast} from '../../components/atoms/customToast';
import Toast from 'react-native-toast-message';
import {colorPallete} from '../../components/atoms/colorPalette';
import Analytics from '../../components/organisms/analytics';

const Settings = ({navigation}) => {
  const connected = useSelector(state => state.internetConnectivity?.data);

  return (
    <View style={styles.container}>
      <SubHeader title={'Settings'} navigation={navigation} />
      <SettingsList borderColor="white" backgroundColor="white">
        <SettingsList.Header
          headerText="Settings"
          headerStyle={styles.setting}
        />
        <SettingsList.Item
          hasNavArrow={true}
          title="Notification settings"
          titleStyle={styles.settingItems}
          onPress={() => {Linking.openSettings()
            Analytics('Settings','Notification Settings')
          }}
        />

        <SettingsList.Header
          headerText="General"
          headerStyle={styles.general}
        />
        <SettingsList.Item
          hasNavArrow={false}
          title="About Medstick"
          titleStyle={styles.settingItems}
          onPress={() =>{ navigation.navigate('About')
          Analytics('Settings','About us')
          }}
        />

        <SettingsList.Item
          hasNavArrow={false}
          title="Feedback"
          titleStyle={styles.settingItems}
          onPress={() => {
            connected
              ? navigation.navigate('Feedback')
              : ErrorToast({text1: 'NO INTERNET', position: 'bottom'});
          Analytics('Settings','Feedback')
          }}
        />

        <SettingsList.Item
          hasNavArrow={false}
          title="Share with friends and family"
          titleStyle={styles.settingItems}
          onPress={async () => {
            try {
              await Share.share({
                title: 'Medstick',
                url: 'https://cdn.discordapp.com/attachments/941592669933682699/955175698568462437/vinaylogo.png',
              });
            } catch (error) {}
            Analytics('Settings','Share Button')
          }}
        />
      </SettingsList>
      <Toast visibilityTime={1500} />
    </View>
  );
};

export default Settings;
