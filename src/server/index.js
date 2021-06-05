import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'

import { getServerRoutes } from '../app'
import { initStore } from '../store'
import App from '../components/App'
import createServer from './createServer'

const clientDir = path.resolve(__dirname, '../client')
const app = express()

// serve static assets
app.use(express.static(clientDir, { index: '_' }))
//app.get(/\.(js|css|map|ico)$/, express.static(__dirname, '../client'))

app.get('*', async (req, res) => {

  const parsedUrl = req._parsedOriginalUrl
  const location = req.url

  const serverRoutes = await getServerRoutes()

  // get matched route
  const matchRoute = serverRoutes.find(route => matchPath(parsedUrl.pathname, route))

  if (!matchRoute) {
    return res.status(404).send("Not found.")
  }

  const store = initStore()

  // fetch data of the matched component
  let context = null
  if (matchRoute.component && typeof matchRoute.component.serverCallback === 'function') {
    try {
      context = await matchRoute.component.serverCallback({ store, parsedUrl, matchRoute })
    } catch (error) {
      context = { error }
    }
  }

  const appHTML = renderToString(
    <StaticRouter location={location} context={context}>
      <App store={store} routes={serverRoutes} />
    </StaticRouter>
  )

  const indexHTML = fs.readFileSync(path.resolve(clientDir, 'index.html'), {
    encoding: 'utf8',
  })
    .replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>`
    )
    .replace(
      '<script>window.__STATE__</script>',
      `<script>window.__STATE__=${JSON.stringify(store.getState())}</script>`
    );

  res.contentType('text/html')
  res.status(200)
  res.send(indexHTML)
})

createServer(app)
