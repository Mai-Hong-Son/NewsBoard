import _ from 'lodash';

const DEFAULT_STATES = { data: '', reloadScreen: null, error: false };

export const language = (state = DEFAULT_STATES, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'CHANGE_LANGUAGE')
  ) {
    return { ...state, error: true };
  }

  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'CHANGE_LANGUAGE')
  ) {
    return { ...state, data: action.payload, reloadScreen: new Date(), error: false };
  }

  return state;
};

