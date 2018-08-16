import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const guiphanhoi = (info) => {
  const action = createAction('GUI_PHAN_HOI');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: info,
      headers: buildHeaders(state),
      method: 'POST',
      url: '/cong_tra_cuu_thuoc/lien_he'
    };
    dispatch(action({ request }));
  };
};
