import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const getLanguagesSetting = () => {
  const action = createAction('GET_LANGUGES_SETTING');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/languages`
    };

    dispatch(action({ request }));
  };
};

export const getCountriesSetting = () => {
  const action = createAction('GET_COUNTRIES_SETTING');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/countries`
    };

    dispatch(action({ request }));
  };
};

export const getRegionsSetting = () => {
  const action = createAction('GET_REGIONS_SETTING');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/regions`
    };

    dispatch(action({ request }));
  };
};

export const getCategoriesSetting = () => {
  const action = createAction('GET_CATEGORIES_SETTING');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/categories`
    };

    dispatch(action({ request }));
  };
};

