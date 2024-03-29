import https from 'https'
import http from 'http'
import config, { getSecureOptions } from '../config/server'

export default function (app) {
  let server = null

  if (config.secure) {
    server = https.createServer(getSecureOptions(), app)
  } else {
    // V1
    //server = app
    //
    // V2
    server = http.createServer(app)
  }

  server.listen(
    config.port,
    config.host,
    config.backlog,
    () => console.log(`Listening on http${config.secure ? 's' : ''}://${config.host}:${config.port}`)
  )
}