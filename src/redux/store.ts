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
// Async Storage is the native engine to save data on the phone
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your slices
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import historyReducre from './slices/historySlice'

// 1. Combine Reducers
// We merge auth and favorites into one big state object
const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  history: historyReducre,
});


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favorites', 'history'], 
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