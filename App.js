/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
// import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { AppWithNavigationState } from './app/components/AppNavigator/withConnect';
import buildStore from './redux/store';

const { store } = buildStore();

export default class App extends React.Component {
  componentDidMount() {
    // SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
