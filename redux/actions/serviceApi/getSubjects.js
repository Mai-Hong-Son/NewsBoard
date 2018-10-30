import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const getSubjects = () => {
  const action = createAction('GET_SUBJECTS');

  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.localhost.data;

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `${payload}/subjects`
    };

    dispatch(action({ request }));
  };
};
