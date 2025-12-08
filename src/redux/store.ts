import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import secureStorage from './secureStorage';


import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import historyReducre from './slices/historySlice'
import placesReducer from './slices/placesSlice';


const authPersistConfig = {
  key: 'auth',
  storage: secureStorage,
  keyPrefix: 'persist_',
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  favorites: favoritesReducer,
  history: historyReducre,
  places: placesReducer,
});


const rootPersistConfig = { 
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites', 'history', 'places'],
};


const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;