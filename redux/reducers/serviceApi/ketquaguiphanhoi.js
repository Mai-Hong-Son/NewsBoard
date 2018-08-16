import _ from 'lodash';

const DEFAULT_STATES = {
  error: false
};

export const ketquaguiphanhoi = (state = DEFAULT_STATES, action) => {
  if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GUI_PHAN_HOI')) {
    return { nonce: Date.now(), error: true };
  }

  if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GUI_PHAN_HOI')) {
    return { nonce: Date.now(), error: false };
  }

  return state;
};
