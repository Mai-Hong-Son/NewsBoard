import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false };

export const articlesSource = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_SOURCES')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_SOURCES')) {
    if (action.payload.config.pageNumber === 1) {
      state.data = [];
    }

    return { ...state, data: [...state.data, ...action.payload.data.items], error: false };
  }
  return state;
};
