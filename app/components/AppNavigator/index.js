import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import moment from 'moment';
import 'moment/locale/vi';
import { MainStack } from './MainNavigator';

moment.locale('vi');

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer,
);

export const AppNavigator = reduxifyNavigator(MainStack, 'root');
