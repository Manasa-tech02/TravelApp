// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { 
//   persistStore, 
//   persistReducer, 
//   FLUSH, 
//   REHYDRATE, 
//   PAUSE, 
//   PERSIST, 
//   PURGE, 
//   REGISTER 
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import secureStorage from './secureStorage';



// import favoritesReducer from './slices/favoritesSlice';
// import historyReducre from './slices/historySlice'
// import placesReducer from './slices/placesSlice';
// import { placesApi } from '../services/placesApi';

// const authPersistConfig = {
//   key: 'auth',
//   storage: secureStorage,
//   keyPrefix: 'persist_',
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


// const rootReducer = combineReducers({
 
//   favorites: favoritesReducer,
//   history: historyReducre,
//   places: placesReducer,
//   [placesApi.reducerPath]: placesApi.reducer,
// });


// const rootPersistConfig = { 
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['favorites', 'history', 'places'],
// };


// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


// export const store = configureStore({
//   reducer: persistedReducer,
 
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(placesApi.middleware),
// });


// export const persistor = persistStore(store);


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux slices
import favoritesReducer from './slices/favoritesSlice';
import historyReducer from './slices/historySlice';
import placesReducer from './slices/placesSlice';

// RTK Query
import { placesApi } from '../services/placesApi';


const rootReducer = combineReducers({
  favorites: favoritesReducer,
  history: historyReducer,
  places: placesReducer,
  [placesApi.reducerPath]: placesApi.reducer,
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
    }).concat(placesApi.middleware),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;





