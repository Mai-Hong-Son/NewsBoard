import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getCategories = () => {
  const action = createAction('GET_CATEGORIES');

  return async (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/categories/me`
    };

    await dispatch(action({ request }));
  };
};
