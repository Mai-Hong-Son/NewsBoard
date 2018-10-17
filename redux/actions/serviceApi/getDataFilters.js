import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const getLanguages = () => {
  const action = createAction('GET_LANGUGES');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/languages/me'
    };

    dispatch(action({ request }));
  };
};

export const getCountries = () => {
  const action = createAction('GET_COUNTRIES');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/countries/me'
    };

    dispatch(action({ request }));
  };
};

export const getRegions = () => {
  const action = createAction('GET_REGIONS');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/regions/me'
    };

    dispatch(action({ request }));
  };
};

export const getSources = (filterData) => {
  const action = createAction('GET_SOURCES');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      data: filterData,
      method: 'POST',
      url: '/v2/sources'
    };

    dispatch(action({ request }));
  };
};

