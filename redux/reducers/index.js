import { tokenAccess, userInfo, localhost } from './auth';
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
import {
  languagesSetting,
  countriesSetting,
  regionsSetting,
  categoriesSetting
} from './serviceApi/dataFiltersSetting';

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
  languagesSetting,
  countriesSetting,
  regionsSetting,
  categoriesSetting,
  localhost
};
