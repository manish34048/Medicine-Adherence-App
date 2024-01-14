import {View, Modal} from 'react-native';
import React from 'react';

const CustomModal = ({
  modalVisible,
  modalView,
  customStyles,
  type,
  onRequestClose,
  text,
}) => {
  return (
    <Modal
      animationType={type}
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      {type === 'slide' && (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={customStyles}>{modalView}</View>
        </View>
      )}
      {type === 'fade' && (
        <>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={customStyles}>{modalView}</View>
          </View>
        </>
      )}
      {text === 'imageViewer' && <>{modalView}</>}
    </Modal>
  );
};

export default CustomModal;
