import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false }

export const ketquatimkiem = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'TIM_KIEM_THUOC')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'TIM_KIEM_THUOC')) {
    if (action.payload.config.pageNumber === 1) {
      state.data = [];
    }

    return { ...state, data: [...state.data, ...action.payload.data.items], error: false };
  }
  return state;
}