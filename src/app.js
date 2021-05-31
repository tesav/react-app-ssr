import React from 'react'
import routes from './routes'

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

export { routes }

export async function getServerRoutes() {
  return /*await*/ Promise.all(routes.map(async ({ ...route }) => {
    route.component = await _interopRequireDefault(await route.component).default
    return route
  }))
}

export function routeName(name, data = {}, full = false) {

  const route = routes.find(route => route.name === name)

  let path = '#'

  if (!route) {
    console.error(`ROUTER ERROR: Route name: "${name}" not found!`)
  } else {
    path = route.path

    if (data) {

      if (data.params && Object.keys(data.params).length) {
        try {
          path = compile(path, { encode: encodeURIComponent })(data.params)
        } catch (e) {
          console.error(`ROUTER ERROR: Route name "${name}" error: ${e}!`)
        }
      }

      if (data.query) {
        if (typeof data.query === 'string') {
          path += `?${data.query.replace(/^\?/, '')}`
        } else if (typeof data.query === 'object') {
          const temp = []
          for (let [key, value] of Object.entries(data.query)) {
            temp.push(`${key}=${value}`)
          }
          path += `?${temp.join('&')}`
        }
      }

      if (data.hash) {
        path += `#${data.hash.replace('#', '')}`
      }

      if (data.state && Object.keys(data.state).length) {
        if (full) {
          console.warn(`ROUTER WARNING: Route name "${name}" "state" no effect!`)
        } else {
          return { pathname: path, state: data.state }
        }
      }
    }
  }

  return path
  //return full ? `${w.location.origin}${path}` : path
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
