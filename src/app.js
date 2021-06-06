import React from 'react'
import { pathToRegexp, match, parse, compile } from 'path-to-regexp'
import { initStore } from './config/store'
import reducers from './store/reducers'
import routes from './routes'

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

export {
  routes,
  initStore,
  reducers,
}

export async function getServerRoutes() {
  return /*await*/ Promise.all(routes.map(async ({ ...route }) => {
    route.component = await _interopRequireDefault(await route.component).default
    return route
  }))
}

/**
 * Returns a route by route name
 * 
 * @param {string} name
 * 
 * @param {Object} [data]
 * @param {Object} [data.params]
 * @param {Object|string} [data.query]
 * @param {string} [data.hash]
 * @param {Object} [data.state]
 * 
 * @param {Object} [options]
 * @param {boolean} [options.full=false] - If need full URL
 * @param {boolean} [options.encode=true] - Encode data.params
 * 
 * @returns {string}
 */
export function routeName(name, data = {}, options = {}) {

  const route = routes.find(route => route.name === name)
  const obj = data || {}
  const opt = Object.assign({ encode: true }, options)
  let path = '#'

  if (!route) {
    console.error(`ROUTER ERROR: Route name: "${name}" not found!`)
  } else {
    path = compile(route.path, !opt.encode ? {} : { encode: encodeURIComponent })(obj.params)

    if (obj.query) {
      if (typeof obj.query === 'string') {
        path += `?${obj.query.replace(/^\?/, '')}`
      } else if (typeof obj.query === 'object') {
        const temp = []
        for (let [key, value] of Object.entries(obj.query)) {
          temp.push(`${key}=${value}`)
        }
        path += `?${temp.join('&')}`
      }
    }

    if (obj.hash) {
      path += `#${obj.hash.replace('#', '')}`
    }

    if (obj.state && Object.keys(obj.state).length) {
      if (opt.full) {
        console.warn(`ROUTER WARNING: Route name "${name}" "state" no effect!`)
      } else {
        return { pathname: path, state: obj.state }
      }
    }
  }

  return opt.full ? `${getHost()}${path}` : path
}

export function getHost() {
  console.warn(`Not Implemented!`)
  return ''
}

export function isSSR() {
  return typeof window === 'undefined'
}

export function lazy(cb) {
  if (isSSR()) {
    return cb()
  }
  return React.lazy(cb)
}

export function pageServerCallback(cb, Page) {
  Page.serverCallback = cb
  return Page
}