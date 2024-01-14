import {View} from 'react-native';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {styles} from '../../styles/homeScreenStyles/calenderStyles';
import moment from 'moment';

const Calender = props => {
  let td_da = moment().format('YYYY-MM-DD');
  let upcomingDate = new Date();
  let endDate =
    upcomingDate.getFullYear() +
    '-' +
    (upcomingDate.getMonth() + 1) +
    '-' +
    (upcomingDate.getDate() + 7 > 31
      ? upcomingDate.getDate() + 31 - upcomingDate.getDate()
      : upcomingDate.getDate() + 7);

  const dateBlackList = i => {
    let temp = i.format('YYYY-MM-DD');
    if (temp > td_da) {
      return i;
    }
  };

  return (
    <View style={{height: '40%'}}>
      <CalendarStrip
        numDaysInWeek={7}
        scrollable
        selectedDate={moment().format('YYYY-MM-DD')}
        onDateSelected={todayDate => {
          props.date(todayDate.format('YYYY-MM-DD'));
        }}
        style={styles.calendar}
        calendarColor={styles.calendarColor}
        highlightDateNumberStyle={styles.highlightedDateNumber}
        highlightDateNameStyle={styles.highlightedDateName}
        calendarHeaderStyle={styles.calenderHeaderStyle}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        daySelectionAnimation={styles.daySelection}
        iconContainer={styles.icon}
        iconStyle={styles.iconStyle}
        datesBlacklist={dateBlackList}
        dayComponentHeight={40}
        disabledDateNameStyle={{color: 'black'}}
        disabledDateNumberStyle={{color: 'black'}}
        maxDate={new Date(endDate)}
        // headerText={
        //   moment()._d.getDate() +
        //   ' ' +
        //   monthsFullName[upcomingDate.getMonth()] +
        //   ' , ' +
        //   upcomingDate.getFullYear()
        // }
        // minDate={new Date(startDate)}
      />
    </View>
  );
};

export default Calender;
