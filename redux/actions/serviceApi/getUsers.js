import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getUsers = () => {
  const action = createAction('GET_USERS');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/v3/users`
    };

    dispatch(action({ request }));
  };
};
