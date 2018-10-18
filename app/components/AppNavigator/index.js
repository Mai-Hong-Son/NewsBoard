import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';

import 'moment/locale/vi';
import { MainStack } from './MainNavigator';

moment.locale('vi');
OneSignal.init('ab8db8a2-635a-4cd9-b3a3-7cfb3d8aef12');

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer,
);

export const AppNavigator = reduxifyNavigator(MainStack, 'root');
