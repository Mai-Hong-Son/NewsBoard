import { createAction } from 'redux-actions';
import { buildHeaders } from '../utils';

export const login = account => {
  const action = createAction('LOGIN');

  return dispatch => {
    const request = {
      data: account,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: '/api-token-auth'
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

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/user_info'
    };

    dispatch(action({ request, client: 'default' }));
  };
};
