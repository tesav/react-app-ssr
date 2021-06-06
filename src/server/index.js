import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'

import { getServerRoutes, initStore } from '../app'
import App from '../components/App'
import createServer from './createServer'
import { callServerCallback, callServerCallbackUses } from './callServerCallback'

const clientDir = path.resolve(__dirname, '../client')
const app = express()

// serve static assets
app.use(express.static(clientDir, { index: '_' }))
//app.get(/\.(js|css|map|ico)$/, express.static(__dirname, '../client'))

app.get('*', async (req, res) => {

  const parsedUrl = req._parsedOriginalUrl

  const routes = await getServerRoutes()

  // get matched route
  const route = routes.find(route => matchPath(parsedUrl.pathname, route))

  if (!route) {
    return res.status(404).send("Not found.")
  }

  const store = initStore()

  if (route.component) {
    if (typeof route.component.serverCallback === 'function') {
      await callServerCallback(req, routes, route.component.serverCallback, store)
    } else if (typeof route.component.serverCallbackUses === 'function') {
      await callServerCallbackUses(req, routes, route.component.serverCallbackUses, store)
    }
  }

  send(req, res, routes, store)
})

function send(req, res, routes, store) {

  let context = null
  const appHTML = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App store={store} routes={routes} />
    </StaticRouter>
  )

  // Grab the initial state from our Redux store
  const state = store.getState()

  // Send the rendered page back to the client
  res
    .contentType('text/html')
    .status(200)
    .send(renderFullPage(appHTML, state))
}

function renderFullPage(appHTML, state) {
  return fs.readFileSync(path.resolve(clientDir, 'index.html'), {
    encoding: 'utf8',
  })
    .replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>`
    )
    .replace(
      '<script>window.__STATE__</script>',
      `<script>window.__STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>`
    )
}

createServer(app)
