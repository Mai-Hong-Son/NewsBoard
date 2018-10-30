import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const shareArticle = article => {
  const action = createAction('SHARE_ARTICLE');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      data: article,
      headers: buildHeaders(state),
      method: 'POST',
      url: `${payload}/v4/shares`
    };

    dispatch(action({ request }));
  };
};

export const getArticleShareByMe = () => {
  const action = createAction('GET_ARTICLE_SHARE_BY_ME');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/v4/shared`
    };

    dispatch(action({ request }));
  };
};

export const deleteArticleShareByMe = (id) => {
  const action = createAction('DELETE_ARTICLE_SHARE_BY_ME');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'DELETE',
      url: `${payload}/v4/shared/${id}`
    };

    dispatch(action({ request }));
  };
};

export const getArticleShareForMe = () => {
  const action = createAction('GET_ARTICLE_SHARE_FOR_ME');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/v4/shares`
    };

    dispatch(action({ request }));
  };
};

export const deleteArticleShareForMe = (id) => {
  const action = createAction('DELETE_ARTICLE_SHARE_FOR_ME');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'DELETE',
      url: `${payload}/v4/shares/${id}`
    };

    dispatch(action({ request }));
  };
};

