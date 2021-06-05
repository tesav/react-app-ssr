import https from 'https'
import http from 'http'
import config, { secureOptions } from './config'

export default app => {
    let server = null

    if (config.secure) {
        server = https.createServer(secureOptions, app)
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