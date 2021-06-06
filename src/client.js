import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { routes, initStore } from './app'
import App from './components/App'

const store = initStore(typeof window.__STATE__ === 'undefined' ? {} : window.__STATE__)
delete window.__STATE__

ReactDOM./*hydrate*/render(
  <BrowserRouter>
    <Suspense fallback={<h1>Loading...</h1>}>
      <App store={store} routes={routes} />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
