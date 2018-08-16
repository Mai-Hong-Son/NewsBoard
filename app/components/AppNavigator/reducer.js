import { RootStacks, MainStack } from './MainNavigator';
import RoutersMiddleware from '../Reusables/RoutersMiddleware';

const initialState = MainStack.router.getStateForAction(MainStack.router.getActionForPathAndParams('Login'));

export const navReducer = (state = initialState, action) => {
  const nextState = MainStack.router.getStateForAction(action, state);

  return nextState || state;
};

export const mainRouter = (state, action) => {
  const duplicatedNavigate = RoutersMiddleware.duplicatedNavigate(action, 'mainRouter');
  if (duplicatedNavigate) return state;

  return RootStacks.router.getStateForAction(action, state);
};
