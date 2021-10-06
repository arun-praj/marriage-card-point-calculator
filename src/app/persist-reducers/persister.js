import { persistReducer } from 'redux-persist'
import storage from 'redux-persist-indexeddb-storage'

import playerReducer from '../slices/playerSlice'
import gameOptionReducer from '../slices/gameOptionsSlice'
import gameHistoryReducer from '../slices/gameHistory'
const playerPersistConfig = {
   key: 'players',
   version: 1,
   storage: storage('marriageDB'), //You can use localstorage instead
   blacklist: [''], //blacklisting a store attribute name, will not persist that store attribute. eg. products
   whitelist: ['players'], // is specifed must be attribute that you need to persist
   // stateReconciler
   // debug,
}

const gameOptionPersistConfig = {
   key: 'gameOption',
   version: 1,
   storage: storage('marriageDB'),
}

const gameHistoryPersistConfig = {
   key: 'gameHistory',
   version: 1,
   storage: storage('marriageDB'),
}
export const persistedPlayerReducer = persistReducer(playerPersistConfig, playerReducer)
export const persistedGameOptionReducer = persistReducer(gameOptionPersistConfig, gameOptionReducer)
export const persistedGameHistoryReducer = persistReducer(gameHistoryPersistConfig, gameHistoryReducer)
