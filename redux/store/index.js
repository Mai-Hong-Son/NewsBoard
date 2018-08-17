import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import axiosMiddleware from './axiosMiddleware';

import { middleware } from './../../app/components/AppNavigator/index';
import { navReducer, mainRouter } from './../../app/components/AppNavigator/reducer';
import {
  tokenAccess,
  thuocmoicapnhat,
  truyxuathoadon,
  ketquatimkiem,
  postDetail,
  categories,
  ketquatruyxuathandung,
  saveArticleStatus,
  articles,
  myArticles,
  statusBack
} from './../reducers/index';

const config = {
  key: 'root',
  storage,
  blacklist: ['mainRouter', 'navReducer', 'articles']
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function buildStore() {
  const reducers = persistCombineReducers(config, {
    navReducer,
    mainRouter,
    tokenAccess,
    thuocmoicapnhat,
    truyxuathoadon,
    ketquatimkiem,
    postDetail,
    categories,
    ketquatruyxuathandung,
    saveArticleStatus,
    articles,
    myArticles,
    statusBack
  });

  const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk, axiosMiddleware, middleware)));
  const persistor = persistStore(store);

  return { store, persistor };
}
