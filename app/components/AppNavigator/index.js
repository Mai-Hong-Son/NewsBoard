import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import OneSignal from 'react-native-onesignal';

import { MainStack } from './MainNavigator';

OneSignal.init('581b287b-a830-47e9-83c9-8abe9d53f1a1');
OneSignal.configure();

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer,
);

export const AppNavigator = reduxifyNavigator(MainStack, 'root');
