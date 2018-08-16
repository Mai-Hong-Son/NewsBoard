import _ from 'lodash';

const DEFAULT_STATES = { data: {}, error: false };

export const ketquatruyxuathandung = (state = DEFAULT_STATES, action) => {
  if (
    _.endsWith(action.type, ':ERROR') &&
    _.startsWith(action.type, 'TRUY_XUAT_HAN_DUNG')
  ) {
    console.log('ketquatruyxuathandung error');
    return { ...state, error: true };
  }

  if (
    _.endsWith(action.type, ':SUCCESS') &&
    _.startsWith(action.type, 'TRUY_XUAT_HAN_DUNG')
  ) {
    console.log('ketquatruyxuathandung success');
    return { ...state, data: action.payload.data, error: false };
  }

  return state;
};
