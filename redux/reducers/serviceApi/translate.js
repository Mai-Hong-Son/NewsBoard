import _ from 'lodash';

const DEFAULT_STATES = { data: 'vi', reloadScreen: null, error: false };

export const language = (state = DEFAULT_STATES, action) => {
  if (_.startsWith(action.type, 'CHANGE_LANGUAGE')) {
    return { ...state, data: action.payload, reloadScreen: new Date(), error: false };
  }

  return state;
};

