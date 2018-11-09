import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import axiosMiddleware from './axiosMiddleware';

import { middleware } from './../../app/components/AppNavigator/index';
import { navReducer, mainRouter } from './../../app/components/AppNavigator/reducer';
import {
  localhost,
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
  // articles,
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
  language
} from './../reducers/index';

const config = {
  key: 'root',
  storage,
  blacklist: [
    'mainRouter',
    'navReducer',
    'articles',
    'articlesSource',
    'languages',
    'regions',
    'countries',
    'sources',
    'summaries',
    // 'articlesSource',
    'postDetail',
    'summaryDetail',
    'saveArticleStatus',
    // 'articles',
    'myArticles',
    'subjects',
    'issues',
    'users',
    'createIssue',
    'updateIssue',
    'shareArticleStatus',
    'articleShareByMe',
    'articleShareForMe',
    'deleteArticleStatus',
    'deleteArticleShareByMe',
    'deleteArticleShareForMe'
  ]
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function buildStore() {
  const reducers = persistCombineReducers(config, {
    navReducer,
    mainRouter,
    tokenAccess,
    localhost,
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
    // articles,
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
    language
  });

  const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk, axiosMiddleware, middleware)));
  const persistor = persistStore(store);

  return { store, persistor };
}
