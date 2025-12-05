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
import secureStorage from './secureStorage';

// Import your slices
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import historyReducre from './slices/historySlice'
import placesReducer from './slices/placesSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  history: historyReducre,
  places: placesReducer,
});


const persistConfig = {
  key: 'root',
  storage: secureStorage,
  whitelist: ['auth', 'favorites', 'history',
    'places'
  ], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


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