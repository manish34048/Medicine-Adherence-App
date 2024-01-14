import PushNotification from 'react-native-push-notification';
import {colorPallete} from '../components/atoms/colorPalette';
class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification) {},
      popInitialNotification: true,
      requestPermissions: false.valueOf,
    });

    // PushNotification.cancelAllLocalNotifications();

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Take medicine',
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      // console.log('SN -----', rn);
    });
  }

  schduleNotification(date, check1, name, enddate, check2, length, time) {
    let currentTime = new Date();
    let currentTime2 =
      currentTime.getFullYear() +
      '-' +
      (currentTime.getMonth() + 1) +
      '-' +
      currentTime.getDate();

    if (check1 || enddate == 'No End Date') {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Time to take medicine',
        message: `Take ${name} at ${time}`,
        date: date,
        repeatType: 'day',
        color: colorPallete.mainColor,
      });
    } else if (check2) {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Time to take medicine',
        message: `Take ${name} at ${time}`,
        date: date,
        repeatType: 'week',
        repeatTime: length,
        color: colorPallete.mainColor,
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Time to take medicine',
        message: `Take ${name} at ${time}`,
        date: date,
        repeatType: currentTime2 <= enddate ? 'day' : null,
        color: colorPallete.mainColor,
      });
    }
  }
  schduleNotification2(date, time) {
    console.log(time, 'time');
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Appointment!',
      message: `You have an appointment scheduled at ${time}`,
      date: date,
      color: colorPallete.mainColor,
    });
  }
  notifyMedicineNotification(date, stock, name) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Stocks! ',
      playSound: true,
      soundName: 'android.resource://com.project/raw/notification.mp3',
      message: `You have left with only ${stock} ${name}`,
      date: date,
    });
  }
  loginScheduleNotification(date, time, name, repeat) {
    console.log(date, time, name, repeat,"aur bta bhai kesa he");
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: 'Time to take medicine',
      message: `Take ${name} at ${time}`,
      date: date,
      repeatType:`${repeat}`,
    });
  }
}

export default new Notifications();
