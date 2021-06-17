import React from 'react'
import { compile } from 'path-to-regexp'
import { initStore } from './config/store'
import reducers from './store/reducers'
import routes from './routes'

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

const ENV = (isSSR() ? process.env : window.env) || {}

export {
  ENV,
  routes,
  initStore,
  reducers,
}

export async function getServerRoutes() {
  return Promise.all(routes.map(async ({ ...route }) => {
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
    throw `ROUTER ERROR: Route name: "${name}" not found!`
  } else {
    path = compile(route.path, !opt.encode ? {} : { encode: encodeURIComponent })(obj.params)

    if (obj.query) {
      if (typeof obj.query === 'string') {
        path += `?${obj.query.replace(/^\?/, '')}`
      } else if (typeof obj.query === 'object') {
        const temp = []
        for (const [key, value] of Object.entries(obj.query)) {
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
        throw (`ROUTER WARNING: Route name "${name}" "state" no effect!`)
      } else {
        return { pathname: path, state: obj.state }
      }
    }
  }

  return opt.full ? `${getHost()}${path}` : path
}

export function getHost() {
  console.warn('Not Implemented!')
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

export function pageServerCallbackUses(cb, Page) {
  Page.serverCallbackUses = cb
  return Page
}

export function getEnv(value, defaultValue = null) {
  return ENV[value] !== undefined ? ENV[value] : defaultValue
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getScriptJson(id, defaultData = {}) {
  try {
    const el = document.getElementById(id)
    const data = JSON.parse(el.innerText) || defaultData
    el.remove()
    return data
  } catch (error) { }

  return defaultData
}