import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const postSettings = (setting) => {
  const action = createAction('POST_SETTINGS');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: setting,
      method: 'POST',
      headers: buildHeaders(state),
      url: '/setting'
    };

    dispatch(action({ request }));
  };
};

export const getSettingNotify = () => {
  const action = createAction('GET_SETTING_NOTIFY');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      method: 'GET',
      headers: buildHeaders(state),
      url: '/setting_notify'
    };

    dispatch(action({ request }));
  };
};

export const postSettingNotify = (setting_notify) => {
  const action = createAction('POST_SETTING_NOTIFY');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: setting_notify,
      method: 'POST',
      headers: buildHeaders(state),
      url: '/setting_notify'
    };

    dispatch(action({ request }));
  };
};
