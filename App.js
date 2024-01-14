import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/index';
import {StatusBar, LogBox} from 'react-native';
import {colorPallete} from './src/components/atoms/colorPalette';
import store from './src/redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorBoundary from 'react-native-error-boundary';
import {StoreProviderService} from './src/utils/storeProviderService';
import SplashScreen from './src/screens/otherScreens/splashScreen';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

StoreProviderService.init(store);
const reduxStore = StoreProviderService.getStore();

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, [showSplashScreen]);

  return (
    <>
      {showSplashScreen ? <SplashScreen /> : null}

      <SafeAreaView style={{flex: 1}}>
        <ErrorBoundary>
          <Provider store={reduxStore}>
            <StatusBar backgroundColor={colorPallete.mainColor} />
            <MainNavigation />
          </Provider>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};

export default App;
