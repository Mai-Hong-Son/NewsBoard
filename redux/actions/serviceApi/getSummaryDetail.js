import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getSummaryDetail = (id) => {
  const action = createAction('GET_SUMMARY_DETAIL');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `/summary/${id}`
    };

    dispatch(action({ request }));
  };
};
