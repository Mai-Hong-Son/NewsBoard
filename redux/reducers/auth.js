import _ from 'lodash';

const DEFAULT_STATES = { data: {}, error: false, account: {} };

export const localhost = (state = { data: '', error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'SAVE_LOCALHOST')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'SAVE_LOCALHOST')) {
    return { ...state, data: action.payload, error: false };
  }
  return state;
};

export const tokenAccess = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'LOGIN')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'LOGIN')) {
    return { ...state, data: action.payload.data, account: action.payload.config.account, error: false };
  }

  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'LOGOUT')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'LOGOUT')) {
    return { ...state, data: {}, error: false };
  }
  return state;
};

export const userInfo = (state = { data: {}, error: false }, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_USER_INFO')) {
    return { ...state, error: true };
  }
  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_USER_INFO')) {
    return { ...state, data: action.payload.data, error: false };
  }
  return state;
};
