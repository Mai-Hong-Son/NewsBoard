import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const getLanguages = () => {
  const action = createAction('GET_LANGUGES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/languages/me`
    };

    dispatch(action({ request }));
  };
};

export const getCountries = () => {
  const action = createAction('GET_COUNTRIES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/countries/me`
    };

    dispatch(action({ request }));
  };
};

export const getRegions = () => {
  const action = createAction('GET_REGIONS');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/regions/me`
    };

    dispatch(action({ request }));
  };
};

export const getSources = (filterData) => {
  const action = createAction('GET_SOURCES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      data: filterData,
      method: 'POST',
      url: `${payload}/v2/sources`
    };

    dispatch(action({ request }));
  };
};

