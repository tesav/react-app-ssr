import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import reducers from './reducers'
import { StaticRouter, matchPath } from 'react-router-dom'

import App from './components/App'
import routes from './routes'

const app = express()

// serve static assets
app.use(express.static(path.resolve(__dirname), { index: '_' }))
//app.get(/\.(js|css|map|ico)$/, express.static(__dirname))

app.get('*', async (req, res) => {

  const parsedUrl = req._parsedOriginalUrl

  // get matched route
  const matchRoute = routes.find(route => matchPath(parsedUrl.pathname, route))

  if (!matchRoute) {
    return res.status(404).send("Not found.")
  }

  // fetch data of the matched component
  let context = null
  if (matchRoute.component && typeof matchRoute.component.serverLoad === 'function') {
    try {
      context = await matchRoute.component.serverLoad(parsedUrl, matchRoute)
    } catch (error) {
      context = { error }
    }
  }

  const initialState = { initialText: 'rendered on the server' }
  const store = createStore(reducers, initialState)

  const appHTML = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App store={store} />
    </StaticRouter>
  )

  const indexHTML = fs.readFileSync(path.resolve(__dirname, '..', 'build', 'index.html'), {
    encoding: 'utf8',
  })
    .replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>`
    )
    .replace(
      '<script>window.__STATE__</script>',
      `<script>window.__STATE__=${JSON.stringify(initialState)}</script>`
    );

  res.contentType('text/html')
  res.status(200)
  res.send(indexHTML)
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
