import { configureStore } from '@reduxjs/toolkit'
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import playerReducer from './slices/playerSlice'

import {
   persistedPlayerReducer,
   persistedGameOptionReducer,
   persistedGameHistoryReducer,
} from './persist-reducers/persister'

export const store = configureStore({
   reducer: {
      player: persistedPlayerReducer,
      gameOption: persistedGameOptionReducer,
      gameHistory: persistedGameHistoryReducer,
      // user,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

export const persistor = persistStore(
   store,
   {
      manualPersist: false,
      //if set true peristor.persist() at any point to persist data,You usually want to do this if your storage is not ready when the persistStore call is made.
   },
   () => {
      console.log('rehydration is finished')
   }
)
