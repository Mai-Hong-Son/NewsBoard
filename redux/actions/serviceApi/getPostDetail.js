import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getPostDetail = postId => {
  const action = createAction('GET_POST_DETAIL');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/post/${postId}`
    };

    dispatch(action({ request }));
  };
};
