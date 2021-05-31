import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducers from './reducers'
import { BrowserRouter } from 'react-router-dom'

import { routes } from './app'
import App from './components/App'

const store = createStore(reducers, { ...window.__STATE__ })

ReactDOM./*hydrate*/render(
  <BrowserRouter>
    <Suspense fallback={<h1>Loading...</h1>}>
      <App store={store} routes={routes} />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
