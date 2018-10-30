import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getSummaries = (page, pageSize) => {
  const action = createAction('GET_SUMMARIES');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      pageNumber: page,
      pageSize,
      url: `${payload}/summaries/${pageSize}/${page}`
    };

    dispatch(action({ request }));
  };
};
