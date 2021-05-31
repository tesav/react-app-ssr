
import React from 'react'

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export function isSSR() {
    return typeof window === 'undefined'
}

export async function lazy(cb) {
    if (isSSR()) {
        return _interopRequireDefault(await cb()).default
    }
    return React.lazy(cb)
}
