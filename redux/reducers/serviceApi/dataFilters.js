import _ from 'lodash';

export const languages = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_LANGUGES')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_LANGUGES')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const countries = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_COUNTRIES')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_COUNTRIES')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const regions = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_REGIONS')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_REGIONS')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const sources = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_SOURCES')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_SOURCES')) {
    return { ...state, data: action.payload.data.items, error: false };
  }
  return state;
};
