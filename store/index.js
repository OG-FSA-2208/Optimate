import { configureStore } from '@reduxjs/toolkit';
// import reduxLogger from 'redux-logger';
import { useMemo } from 'react';
import {
  userSlice,
  matchesSlice,
  profileSlice,
  messengerSlice,
  surveySlice,
  blacklistSlice,
} from './reducers';

let store;

function initStore(preloadedState) {
  return configureStore({
    reducer: {
      user: userSlice,
      matches: matchesSlice,
      profile: profileSlice,
      messenger: messengerSlice,
      survey: surveySlice,
      blacklist: blacklistSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware() /*.concat(reduxLogger)*/,
    preloadedState,
  });
}

export const initializeStore = (preloadedState) => {
  // ?? checks left side for value, if null or undefined return right side
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For Static Site Generation (SSG) and Server Side Rendering (SSR) always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  //memoization increases efficiency so initializeStore(initialState) will only run when initialState changes, otherwise it uses a cahced value
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
