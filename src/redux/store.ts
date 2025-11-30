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

// 2. Configure Persistence
const persistConfig = {
  key: 'root', // The key in local storage
  storage: AsyncStorage, // Use the phone's file system
  whitelist: ['auth', 'favorites', 'history'], // specific slices to save (we want both)
};

// Wrap the root reducer with the persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Create the Store
export const store = configureStore({
  reducer: persistedReducer,
  // Middleware is required to stop Redux from complaining about non-serializable data 
  // (which Redux Persist uses internally)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Create the Persistor (used in App.tsx to delay rendering until data loads)
export const persistor = persistStore(store);

// 5. Export Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;