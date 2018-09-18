import { tokenAccess, userInfo } from './auth';
import { languages, regions, countries, sources } from './serviceApi/dataFilters';
import { summaries } from './serviceApi/summaries';
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
  userInfo,
  languages,
  regions,
  countries,
  sources,
  summaries,
  articlesSource,
  postDetail,
  categories,
  ketquatruyxuathandung,
  saveArticleStatus,
  articles,
  myArticles,
  statusBack
};
