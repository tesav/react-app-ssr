import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import { getParsedUrl } from './util'

function cbParams(req, route, store) {
  const parsedUrl = getParsedUrl(req)

  return {
    store,
    match: matchPath(parsedUrl.pathname, route),
    //query: new URLSearchParams(parsedUrl.search),
    //parsedUrl
  }
}

function callCallback(req, route, serverCallback, store) {
  return serverCallback(cbParams(req, route, store))
}

function callCallbackUses(req, route, serverCallback, store) {

  let promise = null

  function ServerCallback() {
    promise = serverCallback(cbParams(req, route, store))
    return null
  }

  renderAppToStr(req, route, store, <ServerCallback />)

  return promise
}

// export function renderAppToStr(req, route, store, cmp = null) {
//   const { component, ...rest } = route
//   const location = req.url

//   return renderToString(
//     <StaticRouter location={location} context={{}}>
//       <App store={store} routes={[rest]}>{cmp || component}</App>
//     </StaticRouter>
//   )
// }

export function renderAppToStr(req, route, store, cmp = null) {
  // const { component, ...rest } = route
  const location = req.url

  return renderToString(
    <StaticRouter location={location} context={{}}>
      <App store={store} routes={[route]}>{cmp}</App>
    </StaticRouter>
  )
}

export function callServerCallback(req, route, store) {
  if (route.component) {
    if (typeof route.component.serverCallback === 'function') {
      return callCallback(req, route, route.component.serverCallback, store)
    } else if (typeof route.component.serverCallbackUses === 'function') {
      return callCallbackUses(req, route, route.component.serverCallbackUses, store)
    }
  }
}