import { tokenAccess } from './auth';
import { languages, regions, countries, sources } from './serviceApi/dataFilters';
import { truyxuathoadon } from './serviceApi/truyxuathoadon';
import { articlesSource } from './serviceApi/articlesSource';
import { postDetail } from './serviceApi/postDetail';
import { categories } from './serviceApi/categories';
import { ketquatruyxuathandung } from './serviceApi/ketquatruyxuathandung';
import { saveArticleStatus } from './serviceApi/saveArticleStatus';
import { articles } from './serviceApi/articles';
import { myArticles } from './serviceApi/myArticles';

const statusBack = (state = null, action) => {
  if (action.type === 'Navigation/BACK') {
    return Date.now();
  }
  return state;
};

export {
  tokenAccess,
  languages,
  regions,
  countries,
  sources,
  truyxuathoadon,
  articlesSource,
  postDetail,
  categories,
  ketquatruyxuathandung,
  saveArticleStatus,
  articles,
  myArticles,
  statusBack
};
