import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './authSlice.js';
import { authApi } from '../services/RTKQuery/authApi.js';
import { roleApi } from '../services/RTKQuery/roleApi.js';
import { postApi } from '../services/RTKQuery/postApi.js';
import { perApi } from '../services/RTKQuery/perApi.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const reducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [perApi.reducerPath]: perApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      perApi.middleware,
      postApi.middleware,
      roleApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
