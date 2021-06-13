import express from 'express'
import fs from 'fs'
import path from 'path'
import { matchPath } from 'react-router-dom'
import { getServerRoutes, initStore } from '../app'
import {
  renderAppToStr,
  callServerCallback,
} from './serverCallback'

import createServer from './createServer'
import { getParsedUrl } from './util';

const clientDir = path.resolve(__dirname, '../client')
const app = express()

// serve static assets
app.use(express.static(clientDir, { index: '_' }))
//app.get(/\.(js|css|map|ico)$/, express.static(__dirname, '../client'))

app.get('*', async (req, res) => {

  const routes = await getServerRoutes()
  const parsedUrl = getParsedUrl(req)

  // get matched route
  const route = routes.find(r => {
    const match = matchPath(parsedUrl.pathname, r)
    return match && match.url === parsedUrl.pathname
  })

  if (!route) {
    return res.status(404).send("Not found.")
  }

  const html = await renderPage(req, route)

  // Send the rendered page back to the client
  res
    .contentType('text/html')
    .status(200)
    .send(html)
})

async function renderPage(req, route) {

  const html = fs.readFileSync(path.resolve(clientDir, 'index.html'), {
    encoding: 'utf8',
  })

  if (route.ssr !== undefined && !route.ssr) {
    return html
  }

  const store = initStore()
  let appHTML = renderAppToStr(req, route, store)

  const promise = callServerCallback(req, route, store)
  if (promise) {
    await promise
    // Re render app with store data
    appHTML = renderAppToStr(req, route, store)
  }

  // Grab the initial state from our Redux store
  const state = store.getState()

  return html
    .replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>`
    )
    .replace(
      /(\s*)(<\/body>)/i,
      `$1  <script>window.__STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>$1$2`
    )
}

createServer(app)
