import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const saveArticle = article => {
  const action = createAction('SAVE_ARTICLE');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: [article],
      headers: buildHeaders(state),
      method: 'POST',
      url: '/v4/cart'
    };

    dispatch(action({ request }));
  };
};
