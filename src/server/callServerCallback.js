import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from '../components/App'

export function callServerCallback(req, routes, serverCallback, store) {
    return serverCallback({
        req, routes, store,
    })
}

export function callServerCallbackUses(req, routes, serverCallback, store) {

    let promise = null

    function ServerCallback() {
        promise = serverCallback({
            req, routes, store,
        })
        return null
    }

    renderToString(
        <StaticRouter location={req.url}>
            <App store={store} routes={routes} ><ServerCallback /></App>
        </StaticRouter>
    )

    return promise
}