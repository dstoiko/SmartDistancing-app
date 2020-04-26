import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import { UserTypes } from './UserRedux'

export default () => {
  const userReducer = require('./UserRedux').reducer
  const userPersistConfig = {
    key: 'login',
    storage: AsyncStorage,
    whitelist: [
      'email',
      'id',
      'settings'
    ]
  }

  const appReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer)
  })

  const rootReducer = (state, action) => {
    // If user logs out, delete all their personal data from the app
    if (action.type === UserTypes.LOGOUT) {
      purgeStoredState(userPersistConfig)
      state = undefined
    }

    return appReducer(state, action)
  }

  const store = createStore(rootReducer, {})
  const persistor = persistStore(store)

  return new Promise(async (resolve, reject) => resolve({ store, persistor }))
}
