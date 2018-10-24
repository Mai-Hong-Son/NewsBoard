import _ from 'lodash';

const DEFAULT_STATES = { error: false };

export const shareArticleStatus = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'SHARE_ARTICLE')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'SHARE_ARTICLE')) {
    return { ...state, error: false };
  }
  return state;
};

export const articleShareByMe = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ARTICLE_SHARE_BY_ME')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ARTICLE_SHARE_BY_ME')) {
    return { ...state, data: action.payload.data.results, error: false };
  }
  return state;
};

export const deleteArticleShareByMe = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'DELETE_ARTICLE_SHARE_BY_ME')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'DELETE_ARTICLE_SHARE_BY_ME')) {
    return { ...state, error: false };
  }
  return state;
};

export const articleShareForMe = (state = { data: [], error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ARTICLE_SHARE_FOR_ME')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ARTICLE_SHARE_FOR_ME')) {
    return { ...state, data: action.payload.data.results, error: false };
  }
  return state;
};

export const deleteArticleShareForMe = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'DELETE_ARTICLE_SHARE_FOR_ME')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'DELETE_ARTICLE_SHARE_FOR_ME')) {
    return { ...state, error: false };
  }
  return state;
};
