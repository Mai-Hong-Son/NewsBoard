/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
// import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import { AppWithNavigationState } from './app/components/AppNavigator/withConnect';
import buildStore from './redux/store';

const { store } = buildStore();

export default class App extends React.Component {
  async componentDidMount() {
    // SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <AppWithNavigationState />
        </MenuProvider>
      </Provider>
    );
  }
}
