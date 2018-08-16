import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false, isLoading: true }

export const thuocmoicapnhat = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_THUOC_MOI_CAP_NHAT')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_THUOC_MOI_CAP_NHAT')) {
    return { ...state, data: action.payload.data, error: false, isLoading: false };
  }
  return state;
}