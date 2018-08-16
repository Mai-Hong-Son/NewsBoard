import { tokenAccess } from './auth';
import { thuocmoicapnhat } from './serviceApi/thuocmoicapnhat';
import { truyxuathoadon } from './serviceApi/truyxuathoadon';
import { ketquatimkiem } from './serviceApi/timkiemthuoc';
import { postDetail } from './serviceApi/postDetail';
import { categories } from './serviceApi/categories';
import { ketquatruyxuathandung } from './serviceApi/ketquatruyxuathandung';
import { thuoctheoloai } from './serviceApi/thuoctheoloai';
import { articles } from './serviceApi/articles';
import { ketquaguiphanhoi } from './serviceApi/ketquaguiphanhoi';

const statusBack = (state = null, action) => {
  if (action.type === 'Navigation/BACK') {
    return Date.now();
  }
  return state;
};

export {
  tokenAccess,
  thuocmoicapnhat,
  truyxuathoadon,
  ketquatimkiem,
  postDetail,
  categories,
  ketquatruyxuathandung,
  thuoctheoloai,
  articles,
  ketquaguiphanhoi,
  statusBack
};
