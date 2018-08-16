import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false }

export const thuoctheoloai = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'THUOC_THEO_LOAI')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'THUOC_THEO_LOAI')) {
    if (action.payload.config.pageNumber === 1) {
      state.data = [];
    }

    return { ...state, data: [...state.data, ...action.payload.data.items], error: false };
  }
  return state;
}