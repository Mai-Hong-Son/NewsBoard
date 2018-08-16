import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { MainStack } from './MainNavigator';

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navReducer,
);

export const AppNavigator = reduxifyNavigator(MainStack, 'root');
