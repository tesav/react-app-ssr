import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import {
  getUrl,
  getParsedUrl,
} from './util'

function cbParams(req, route, store) {
  const parsedUrl = getParsedUrl(req)

  return {
    store,
    match: matchPath(parsedUrl.pathname, route),
    //query: new URLSearchParams(parsedUrl.search),
    //parsedUrl
  }
}

export function callServerCallback(req, route, serverCallback, store) {
  return serverCallback(cbParams(req, route, store))
}

export function callServerCallbackUses(req, route, serverCallback, store) {

  let promise = null

  function ServerCallback() {
    promise = serverCallback(cbParams(req, route, store))
    return null
  }

  renderAppToStr(getUrl(req), route, store, <ServerCallback />)

  return promise
}

export function renderAppToStr(location, route, store, cmp = null) {
  const { component, ...rest } = route
  return renderToString(
    <StaticRouter location={location} context={{}}>
      <App store={store} routes={[rest]}>{
        route.ssr === undefined || route.ssr ? cmp || component : null
      }</App>
    </StaticRouter>
  )
}