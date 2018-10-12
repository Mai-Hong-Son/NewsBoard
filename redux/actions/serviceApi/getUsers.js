import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getUsers = () => {
  const action = createAction('GET_USERS');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/v3/users'
    };

    dispatch(action({ request }));
  };
};
