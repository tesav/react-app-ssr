import React from 'react'
// import Home from './pages/Home'
// import About from './pages/About'
import E404 from './pages/E404'

import { lazy } from './app'
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

export default [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'about',
        path: '/about/:filter?',
        component: About,
    },
    // {
    //     name: 'test',
    //     path: '/:id?',
    //     component: Home,
    // },

    {
        name: '404',
        path: '/*',
        component: E404,
    },
]
