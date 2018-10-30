import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const postSettings = (setting) => {
  const action = createAction('POST_SETTINGS');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      data: setting,
      method: 'POST',
      headers: buildHeaders(state),
      url: `${payload}/setting`
    };

    dispatch(action({ request }));
  };
};

export const postSettingNotify = (settingNotify) => {
  const action = createAction('POST_SETTINGS');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      data: settingNotify,
      method: 'POST',
      headers: buildHeaders(state),
      url: `${payload}/setting_notify`
    };

    dispatch(action({ request }));
  };
};

