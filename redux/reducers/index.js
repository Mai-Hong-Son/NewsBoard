import { tokenAccess, userInfo } from './auth';
import { languages, regions, countries, sources } from './serviceApi/dataFilters';
import { summaries } from './serviceApi/summaries';
import { articlesSource } from './serviceApi/articlesSource';
import { postDetail } from './serviceApi/postDetail';
import { categories } from './serviceApi/categories';
import { summaryDetail } from './serviceApi/summaryDetail';
import { saveArticleStatus } from './serviceApi/saveArticleStatus';
import { articles } from './serviceApi/articles';
import { myArticles } from './serviceApi/myArticles';
import { subjects } from './serviceApi/subjects';
import { issues, createIssue, updateIssue } from './serviceApi/issues';
import { users } from './serviceApi/users';
import { shareArticleStatus, articleShareByMe, articleShareForMe } from './serviceApi/articleShare';

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
  summaryDetail,
  saveArticleStatus,
  articles,
  myArticles,
  statusBack,
  subjects,
  issues,
  users,
  createIssue,
  updateIssue,
  shareArticleStatus,
  articleShareByMe,
  articleShareForMe
};
