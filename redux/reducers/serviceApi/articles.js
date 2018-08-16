import _ from 'lodash';

const DEFAULT_STATES = { data: {}, error: false };

export const articles = (state = DEFAULT_STATES, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'GET_ARTICLES')
  ) {
    return { ...state, error: true };
  }

  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'GET_ARTICLES')
  ) {
    return { ...state, data: action.payload.data, error: false };
  }

  return state;
};
