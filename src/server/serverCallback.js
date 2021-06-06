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

    renderToString(
        <StaticRouter location={getUrl(req)}>
            <App store={store} routes={[route]}><ServerCallback /></App>
        </StaticRouter>
    )

    return promise
}