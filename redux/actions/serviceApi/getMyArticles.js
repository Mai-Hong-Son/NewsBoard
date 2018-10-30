import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const getMyArticles = () => {
  const action = createAction('GET_MY_ARTICLES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/v4/cart`
    };
    dispatch(action({ request }));
  };
};
