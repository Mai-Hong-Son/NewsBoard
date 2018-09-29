import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getSubjects = () => {
  const action = createAction('GET_SUBJECTS');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/subjects'
    };

    dispatch(action({ request }));
  };
};
