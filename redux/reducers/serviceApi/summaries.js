import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false, hasMore: true };

export const summaries = (state = DEFAULT_STATES, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'GET_SUMMARIES')
  ) {
    return { ...state, error: true };
  }
  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'GET_SUMMARIES')
  ) {
    if (action.payload.config.pageNumber === 0) {
      state.data = [];
    }

    const status = action.payload.data.result.length === action.payload.config.pageSize;

    return { ...state, data: [...state.data, ...action.payload.data.result], error: false, hasMore: status };
  }
  return state;
};
