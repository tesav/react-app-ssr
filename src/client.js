import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { routes, initStore, getScriptJson } from './app'
import App from './components/App'

const initialProps = getScriptJson('__PAGE_DATA__')
const initialState = getScriptJson('__STATE__')

const store = initStore(initialState)

/*hydrate*/
ReactDOM.render(
    <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
            <App store={store} routes={routes} initialProps={initialProps} />
        </Suspense>
    </BrowserRouter>,
    document.getElementById('root')
)
