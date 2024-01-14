import {
  faUserNurse,
  faUserFriends,
  faRightToBracket,
  faSignOut,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {StyleSheet} from 'react-native';

function Caretaker_nurse() {
  return (
    <FontAwesomeIcon
      style={{marginBottom: 6}}
      color={colorPallete.mainColor}
      icon={faUserNurse}></FontAwesomeIcon>
  );
}

function Signout() {
  return <FontAwesomeIcon color="white" icon={faSignOut}></FontAwesomeIcon>;
}

function Righttoobracket() {
  return (
    <FontAwesomeIcon color="white" icon={faRightToBracket}></FontAwesomeIcon>
  );
}

function Userfriend() {
  return (
    <FontAwesomeIcon
      style={{marginBottom: 6}}
      color={colorPallete.mainColor}
      icon={faUserFriends}></FontAwesomeIcon>
  );
}
const Iconcomp1 = () => {
  return (
    <FontAwesomeIcon
      style={styles.icon}
      color={colorPallete.mainColor}
      icon={faHospitalUser}
    />
  );
};

const Iconcomp2 = () => {
  return (
    <FontAwesomeIcon
      style={styles.icon}
      color={colorPallete.mainColor}
      icon={faUserFriends}
    />
  );
};

const styles = StyleSheet.create({icon: {marginBottom: 6}});

export {
  Caretaker_nurse,
  Userfriend,
  Righttoobracket,
  Signout,
  Iconcomp1,
  Iconcomp2,
};
