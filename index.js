/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {
  PlaySound,
  Pushnotificationforeground,
} from './src/pushNotification/pushNotificationConfig';

PushNotification.configure({
  onAction: function (notification) {
    if (notification.action === 'Open app to mark') {
      PushNotification.invokeApp(notification);
    }
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

messaging().onMessage(async mssg => {
  Pushnotificationforeground(mssg);
});

messaging().onNotificationOpenedApp(mss => {
  if (mss.notification.title === 'caretaker') {
    Pushnotificationforeground(mss);
  } else if (mss.notification.title === 'request') {
    Pushnotificationforeground(mss);
  } else {
    PlaySound();
    Pushnotificationforeground(mss);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.notification.title === 'caretaker') {
    Pushnotificationforeground(remoteMessage);
  } else if (remoteMessage.notification.title === 'request') {
    Pushnotificationforeground(remoteMessage);
  } else {
    PlaySound();
    Pushnotificationforeground(remoteMessage);
  }
});
function sethandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage.notification.title === 'caretaker') {
      Pushnotificationforeground(remoteMessage);
    } else if (remoteMessage.notification.title === 'request') {
      Pushnotificationforeground(remoteMessage);
    } else {
      PlaySound();
      Pushnotificationforeground(remoteMessage);
    }
  });
  return Promise.resolve();
}

AppRegistry.registerHeadlessTask(
  'com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService',
  () => sethandler,
);

AppRegistry.registerComponent(appName, () => App);
