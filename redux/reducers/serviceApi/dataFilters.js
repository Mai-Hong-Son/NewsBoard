import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false };

export const languages = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_LANGUGES')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_LANGUGES')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};
