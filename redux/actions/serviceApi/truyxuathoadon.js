import { createAction } from 'redux-actions';
import { buildHeaders } from '../../utils';

export const truyxuathoadon = receiptId => {
  const action = createAction('GET_TRUY_XUAT_HOA_DON');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      headers: buildHeaders(state),
      method: 'GET',
      url: `/cong_tra_cuu_thuoc/truy_xuat_hoa_don/${receiptId}`
    };

    dispatch(action({ request }));
  };
};
