import { tokenAccess, userInfo } from './auth';
import { languages, regions, countries, sources } from './serviceApi/dataFilters';
import { summaries } from './serviceApi/summaries';
import { articlesSource } from './serviceApi/articlesSource';
import { postDetail } from './serviceApi/postDetail';
import { categories } from './serviceApi/categories';
import { summaryDetail } from './serviceApi/summaryDetail';
import { saveArticleStatus, deleteArticleStatus } from './serviceApi/saveArticleStatus';
import { articles } from './serviceApi/articles';
import { myArticles } from './serviceApi/myArticles';
import { subjects } from './serviceApi/subjects';
import { issues, createIssue, updateIssue } from './serviceApi/issues';
import { users } from './serviceApi/users';
import {
  shareArticleStatus,
  articleShareByMe,
  articleShareForMe,
  deleteArticleShareByMe,
  deleteArticleShareForMe
} from './serviceApi/articleShare';
import { settings } from './serviceApi/settings';
import {
  languagesSetting,
  countriesSetting,
  regionsSetting,
  categoriesSetting
} from './serviceApi/dataFiltersSetting';

const statusRerender = (state = null, action) => {
  if (action.type === 'Navigation/DRAWER_CLOSED') {
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
  summaryDetail,
  saveArticleStatus,
  articles,
  myArticles,
  statusRerender,
  subjects,
  issues,
  users,
  createIssue,
  updateIssue,
  shareArticleStatus,
  articleShareByMe,
  articleShareForMe,
  deleteArticleStatus,
  deleteArticleShareByMe,
  deleteArticleShareForMe,
  settings,
  languagesSetting,
  countriesSetting,
  regionsSetting,
  categoriesSetting
};
