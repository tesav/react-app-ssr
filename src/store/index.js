import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import { connectRouter } from 'connected-react-router'
// import history from 'utils/history'
import slices from './slices'

let store = null

function createReducer() {
  return combineReducers({
    // router: connectRouter(history),
    ...slices,
  })
}

export function initStore(initialState = {}) {

  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const { run: runSaga } = sagaMiddleware

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware]

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ]

  store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  })

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     forceReducerReload(store)
  //   })
  // }

  return store
}

// export default () => store