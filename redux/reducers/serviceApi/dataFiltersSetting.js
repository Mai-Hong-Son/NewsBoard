import _ from 'lodash';

export const languagesSetting = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_LANGUGES_SETTING')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_LANGUGES_SETTING')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const countriesSetting = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_COUNTRIES_SETTING')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_COUNTRIES_SETTING')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const regionsSetting = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_REGIONS_SETTING')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_REGIONS_SETTING')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const categoriesSetting = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_CATEGORIES_SETTING')) {
    return { ...state, error: true, isLoading: false };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_CATEGORIES_SETTING')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};
