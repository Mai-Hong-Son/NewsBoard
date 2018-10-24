import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';

import 'moment/locale/vi';
import { MainStack } from './MainNavigator';

moment.locale('vi');
OneSignal.init('581b287b-a830-47e9-83c9-8abe9d53f1a1');
OneSignal.inFocusDisplaying(2);
OneSignal.configure();

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer,
);

export const AppNavigator = reduxifyNavigator(MainStack, 'root');
