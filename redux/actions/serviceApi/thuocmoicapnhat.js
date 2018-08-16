import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const laythuocmoicapnhat = () => {
  const action = createAction('GET_THUOC_MOI_CAP_NHAT');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: '/cong_tra_cuu_thuoc/thuoc_moi_cap_nhat',
    };

    dispatch(action({ request }));
  };
}