import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const timkiemthuoc = ({ tuKhoa, locTheo, pageNumber, pageSize }) => {
  const action = createAction('TIM_KIEM_THUOC');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: { tuKhoa, locTheo, pageNumber, pageSize },
      headers: buildHeaders(state),
      pageNumber,
      method: 'POST',
      url: '/cong_tra_cuu_thuoc/tim_thuoc'
    };

    dispatch(action({ request }));
  };
};
