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
