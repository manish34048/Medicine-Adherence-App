import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';

const HistoryDetail = ({data, onPress}) => {
  const [filterData, setfilterData] = useState([]);

  function findTime(ele) {
    let time = parseInt(ele.split(':')[0]),
      period = ele.split(' ')[1],
      mtitle;

    if (time >= 0 && time <= 12 && period === 'AM') {
      mtitle = 'Morning';
    } else if (time >= 0 && time <= 6 && period === 'PM') {
      mtitle = 'Afternoon';
    } else if (time >= 7 && time <= 11 && period === 'PM') {
      mtitle = 'Night';
    } else if (time >= 0 && time == 12 && period === 'PM') {
      mtitle = 'Afternoon';
    }

    return mtitle;
  }
  useEffect(() => {
    const sArray = [];
    let time = data.time.split(','),
      taken = data.taken.split(',');
    time[0] !== '' &&
      time.map(ele => {
        if (ele !== '' && !data.taken.includes(ele)) {
          let mtitle = findTime(ele);
          let nottakenObj = {
            time: ele,
            title: <Text style={{color: 'black'}}>{mtitle}</Text>,
            description: (
              <Text style={{color: colorPallete.redPercentageColor}}>
                Not Taken
              </Text>
            ),
          };
          sArray.push(nottakenObj);
        }
      });

    taken[0] !== '' &&
      taken.map(ele => {
        if (ele !== '') {
          let mtitle = findTime(ele);
          let nottakenObj = {
            time: ele,
            title: <Text style={{color: 'black'}}>{mtitle}</Text>,
            description: (
              <Text style={{color: colorPallete.greenPercentageColor}}>
                Taken
              </Text>
            ),
          };
          sArray.push(nottakenObj);
        }
      });

    setfilterData(sArray);
  }, []);

  return (
    <View style={style.container}>
      <View style={style.closeCont}>
        <TouchableOpacity onPress={onPress}>
          <FontAwesomeIcon
            size={26}
            icon={faCircleXmark}
            color={colorPallete.mainColor}
          />
        </TouchableOpacity>
      </View>
      <View style={style.dateCont}>
        <Text style={style.dateText}>Date - {data.date}</Text>
        <View style={style.lineCont}>
          <Timeline
            style={style.timelineCont}
            data={filterData}
            circleSize={20}
            circleColor={colorPallete.mainColor}
            lineColor={colorPallete.mainColor}
            listViewStyle={style.listViewStyle}
            timeContainerStyle={style.timeContainerStyle}
            timeStyle={style.timeStyle}
            isUsingFlatlist={true}
            innerCircle={'dot'}
            detailContainerStyle={style.detailContainerStyle}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '52%',
    width: '90%',
    backgroundColor: colorPallete.backgroundColor,
    borderRadius: 20,
    alignItems: 'center',
  },
  closeCont: {alignSelf: 'flex-end', paddingRight: 10, paddingTop: 10},
  dateCont: {
    padding: 12,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  dateText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  lineCont: {
    // marginVertical: 10,
    width: Dimensions.get('window').width / 1.4,
    height: '70%',
    // backgroundColor: 'lightblue',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  timelineCont: {
    color: 'white',
    marginLeft: 10,
  },
  listViewStyle: {
    // backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  timeContainerStyle: {minWidth: 72},
  timeStyle: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: colorPallete.mainColor,
    padding: 5,
    marginBottom: 70,
    borderRadius: 20,
  },
  detailContainerStyle: {
    justifyContent: 'flex-start',
    marginTop: -12,
  },
});

export default HistoryDetail;
