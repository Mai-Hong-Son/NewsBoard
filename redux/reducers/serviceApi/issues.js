import _ from 'lodash';

const DEFAULT_STATES = { data: [], error: false };

export const issues = (state = DEFAULT_STATES, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'GET_ISSUES')
  ) {
    return { ...state, error: true };
  }
  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'GET_ISSUES')
  ) {
    return { ...state, data: action.payload.data.results, error: false };
  }
  return state;
};

export const createIssue = (state = { data: null, error: false }, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'CREATE_ISSUE')
  ) {
    return { ...state, error: true };
  }
  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'CREATE_ISSUE')
  ) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};

export const updateIssue = (state = { data: null, error: false }, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'UPDATE_ISSUE')
  ) {
    return { ...state, error: true };
  }
  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'UPDATE_ISSUE')
  ) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};
