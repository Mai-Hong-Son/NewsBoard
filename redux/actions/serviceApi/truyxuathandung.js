import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const truyxuathandung = (id, solo) => {
  const action = createAction('TRUY_XUAT_HAN_DUNG');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `/cong_tra_cuu_thuoc/truy_xuat_so_lo?id=${id}&solo=${solo}`
    };

    dispatch(action({ request }));
  };
};
