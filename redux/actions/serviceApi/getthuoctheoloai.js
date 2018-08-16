import { createAction } from 'redux-actions';
import { buildHeaders } from './../../utils';

export const getthuoctheoloai = ({ loai_id, page_number, page_size }) => {
  const action = createAction('THUOC_THEO_LOAI');

  return (dispatch, getState) => {
    const state = getState();

    const request = {
      data: { loai_id, page_number, page_size },
      headers: buildHeaders(state),
      pageNumber: page_number,
      method: 'POST',
      url: '/cong_tra_cuu_thuoc/thuoc_phan_loai',
    };

    dispatch(action({ request }));
  };
}