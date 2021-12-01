import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { API } from '../api';
import { appReducer } from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
