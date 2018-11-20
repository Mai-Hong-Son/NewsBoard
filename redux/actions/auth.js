import { createAction } from 'redux-actions';
import { buildHeaders } from '../utils';

export const saveLocalhost = (localhost) => {
  const actionSuccess = createAction('SAVE_LOCALHOST:SUCCESS');
  const actionError = createAction('SAVE_LOCALHOST:ERROR');

  return async dispatch => {
    try {
      await dispatch(actionSuccess({ payload: localhost }));
    } catch (err) {
      dispatch(actionError());
    }
  };
};

export const login = account => {
  const action = createAction('LOGIN');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      data: account,
      account,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: `${payload}/api-token-auth`
    };

    dispatch(action({ request, client: 'default' }));
  };
};

export const logout = () => {
  const actionSuccess = createAction('LOGOUT:SUCCESS');
  const actionError = createAction('LOGOUT:ERROR');

  return dispatch => {
    try {
      dispatch(actionSuccess());
    } catch (err) {
      dispatch(actionError());
    }
  };
};

export const getUserInfo = () => {
  const action = createAction('GET_USER_INFO');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/user_info`
    };

    dispatch(action({ request, client: 'default' }));
  };
};
