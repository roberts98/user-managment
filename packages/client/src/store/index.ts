import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore() {
  const middlewares = [thunk];
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export type RootState = ReturnType<typeof rootReducer>;

export default makeStore;
