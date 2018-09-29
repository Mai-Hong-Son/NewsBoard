import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getIssues = () => {
  const action = createAction('GET_ISSUES');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/v4/issues?limit=10&offset=0'
    };

    dispatch(action({ request }));
  };
};

export const createIssues = (issue) => {
  const action = createAction('CREATE_ISSUE');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      data: issue,
      method: 'POST',
      url: '/v4/issues'
    };

    dispatch(action({ request }));
  };
};

export const updateIssues = (id, issue) => {
  const action = createAction('UPDATE_ISSUE');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      data: issue,
      method: 'PUT',
      url: `/v4/issues/${id}`
    };

    dispatch(action({ request }));
  };
};
