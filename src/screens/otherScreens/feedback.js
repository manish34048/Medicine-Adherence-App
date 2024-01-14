import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {FEEDBACK} from '../../constants/apiUrl';
import axios from 'axios';

const Feedback = () => {
  const [url, setUrl] = useState('');
  axios({
    method: 'get',
    url: FEEDBACK,
  }).then(response => {
    setUrl(response.data);
  });

  return (
    <WebView
      source={{uri: url}}
      originWhitelist={['http://*', 'https://*', 'intent://*']}
      setSupportMultipleWindows={true}
      allowFileAccess={true}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      geolocationEnabled={true}
      saveFormDataDisabled={true}
      allowFileAccessFromFileURLS={true}
      allowUniversalAccessFromFileURLs={true}
      bounces={false}
    />
  );
};

export default Feedback;
