import _ from 'lodash';

const DEFAULT_STATES = { error: false };

export const saveArticleStatus = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'SAVE_ARTICLE')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'SAVE_ARTICLE')) {
    return { ...state, error: false };
  }
  return state;
};

export const deleteArticleStatus = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'DELETE_ARTICLE_SAVE')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'DELETE_ARTICLE_SAVE')) {
    return { ...state, error: false };
  }
  return state;
};
