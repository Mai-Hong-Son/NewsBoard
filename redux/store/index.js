import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import axiosMiddleware from './axiosMiddleware';

import { middleware } from './../../app/components/AppNavigator/index';
import { navReducer, mainRouter } from './../../app/components/AppNavigator/reducer';
import {
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
    'articles',
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
    'deleteArticleShareForMe',
    'settings',
    'statusRerender'
  ]
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function buildStore() {
  const reducers = persistCombineReducers(config, {
    navReducer,
    mainRouter,
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
  });

  const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk, axiosMiddleware, middleware)));
  const persistor = persistStore(store);

  return { store, persistor };
}
