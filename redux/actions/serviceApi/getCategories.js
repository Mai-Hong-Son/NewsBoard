import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getCategories = () => {
  const action = createAction('GET_CATEGORIES');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/categories/me'
    };

    dispatch(action({ request }));
  };
};
