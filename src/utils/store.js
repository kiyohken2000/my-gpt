import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from 'slices/app.slice'

const rootReducer = combineReducers({
  app: appReducer,
  // add more reducers
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
    // eslint-disable-next-line no-undef
    return __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware
  },
})

export default store
